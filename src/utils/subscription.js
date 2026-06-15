import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Check if an enrollment's subscription has expired.
 * Returns: { expired: bool, daysRemaining: number|null, expiryDate: Date|null }
 */
export function checkEnrollmentExpiry(enrollment) {
    if (!enrollment?.expiryDate) return { expired: false, daysRemaining: null, expiryDate: null };

    try {
        const now = new Date();
        const expiry = enrollment.expiryDate?.toDate
            ? enrollment.expiryDate.toDate()
            : new Date(enrollment.expiryDate);

        const diffTime = expiry.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            expired: diffDays <= 0,
            daysRemaining: diffDays,
            expiryDate: expiry,
        };
    } catch {
        return { expired: false, daysRemaining: null, expiryDate: null };
    }
}

/**
 * Auto-expire enrollments: sets blocked=true on any enrollment past its expiryDate.
 * Returns the number of enrollments that were auto-blocked.
 */
export async function autoExpireEnrollments(userId) {
    const q = await import('firebase/firestore').then(m =>
        m.getDocs(m.query(
            m.collection(db, 'enrollmentPlans'),
            m.where('userId', '==', userId),
            m.where('blocked', '==', false)
        ))
    );

    let expiredCount = 0;
    const now = new Date();

    for (const snap of q.docs) {
        const data = snap.data();
        if (!data.expiryDate) continue;

        const expiry = data.expiryDate?.toDate ? data.expiryDate.toDate() : new Date(data.expiryDate);
        if (expiry.getTime() <= now.getTime()) {
            await updateDoc(doc(db, 'enrollmentPlans', snap.id), {
                blocked: true,
                subscriptionStatus: 'expired',
            });
            expiredCount++;
        }
    }

    return expiredCount;
}

/**
 * Restrict or grant access to a specific enrollment (admin action).
 */
export async function restrictEnrollment(enrollmentId, restrict = true) {
    await updateDoc(doc(db, 'enrollmentPlans', enrollmentId), {
        blocked: restrict,
        subscriptionStatus: restrict ? 'restricted' : 'active',
    });
}

/**
 * Get subscription status label + color for a given enrollment.
 */
export function getSubscriptionStatus(enrollment) {
    if (enrollment?.blocked) {
        return { label: 'Blocked', color: '#ef4444' };
    }

    const { expired, daysRemaining } = checkEnrollmentExpiry(enrollment);

    if (expired) {
        return { label: 'Expired', color: '#ef4444' };
    }
    if (daysRemaining !== null && daysRemaining <= 2) {
        return { label: `Expires in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`, color: '#f59e0b' };
    }
    if (enrollment?.paymentStatus === 'pending' || enrollment?.paymentStatus === 'receipt_required') {
        return { label: 'Pending Payment', color: '#f59e0b' };
    }
    return { label: 'Active', color: '#10b981' };
}
