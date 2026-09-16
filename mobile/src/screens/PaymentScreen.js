import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc, addDoc, collection, serverTimestamp, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, FONT_SIZE, RADIUS, SPACING, formatCurrency } from '../utils/theme';

export default function PaymentScreen({ route, navigation }) {
  const { courseId, planType, planAmount, courseName } = route.params || {};
  const { currentUser, userData } = useAuth();
  const [bankDetails, setBankDetails] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadBankDetails(); }, []);

  async function loadBankDetails() {
    try {
      const snap = await getDoc(doc(db, 'admin', 'bankDetails'));
      if (snap.exists()) setBankDetails(snap.data());
    } catch {} finally { setLoading(false); }
  }

  async function pickReceipt() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert('Permission Required', 'Allow photo access to upload receipt'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (!result.canceled) setReceipt(result.assets[0]);
  }

  async function submitPayment() {
    if (!receipt) { Alert.alert('Error', 'Please select a receipt image'); return; }
    setUploading(true);
    try {
      const fileName = `${currentUser.uid}_${courseId}_${Date.now()}`;
      const storageRef = ref(storage, `payment-receipts/${currentUser.uid}/${fileName}`);
      const response = await fetch(receipt.uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      // Check for existing pending payment
      const existing = await getDocs(query(
        collection(db, 'payments'),
        where('userId', '==', currentUser.uid),
        where('courseId', '==', courseId),
        where('status', 'in', ['pending', 'receipt_required'])
      ));

      if (!existing.empty) {
        const existingDoc = existing.docs[0];
        await updateDoc(doc(db, 'payments', existingDoc.id), {
          receiptURL: downloadURL, status: 'pending', amount: planAmount || 0,
          submittedAt: serverTimestamp(), receiptFileName: receipt.fileName || 'receipt',
        });
      } else {
        await addDoc(collection(db, 'payments'), {
          userId: currentUser.uid, customerEmail: currentUser.email,
          courseId, courseName, customerName: userData?.fullName,
          customerPhone: userData?.whatsappNumber,
          planType: planType || 'onetime', amount: planAmount || 0,
          receiptURL: downloadURL, status: 'pending',
          submittedAt: serverTimestamp(), paymentMethod: 'bank_transfer',
          receiptFileName: receipt.fileName || 'receipt',
          type: 'initial', uploadSuccessful: true,
        });
      }

      Alert.alert('Receipt Submitted', 'Your payment is under review. You will be notified once approved.', [
        { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] }) },
      ]);
    } catch (err) {
      console.error('Payment error:', err);
      Alert.alert('Upload Failed', err.message || 'Could not upload receipt. Please try again.');
    } finally { setUploading(false); }
  }

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <Text style={styles.title}>Complete Payment</Text>
      <Text style={styles.subtitle}>{courseName}</Text>

      {/* Payment Summary */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="receipt-outline" size={24} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Payment Summary</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Course</Text>
          <Text style={styles.summaryValue}>{courseName}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Student</Text>
          <Text style={styles.summaryValue}>{userData?.fullName}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Email</Text>
          <Text style={styles.summaryValue}>{userData?.email}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Plan</Text>
          <Text style={styles.summaryValue}>{planType === 'monthly' ? 'Monthly Subscription' : planType === 'yearly' ? 'Yearly Subscription' : 'Full Access'}</Text>
        </View>
        <View style={[styles.summaryRow, { borderBottomWidth: 0, paddingTop: 14 }]}>
          <Text style={styles.summaryLabel}>Total Amount</Text>
          <Text style={[styles.summaryValue, { color: COLORS.success, fontSize: 22, fontWeight: '800' }]}>{formatCurrency(planAmount)}</Text>
        </View>
      </View>

      {/* Bank Details */}
      {bankDetails && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="business" size={24} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Bank Transfer</Text>
          </View>
          <View style={styles.bankItem}>
            <Text style={styles.bankLabel}>Bank</Text>
            <Text style={styles.bankValue}>{bankDetails.bankName}</Text>
          </View>
          <View style={styles.bankItem}>
            <Text style={styles.bankLabel}>Account Name</Text>
            <Text style={styles.bankValue}>{bankDetails.accountName}</Text>
          </View>
          <View style={[styles.bankItem, { borderBottomWidth: 0 }]}>
            <Text style={styles.bankLabel}>Account Number</Text>
            <Text style={[styles.bankValue, { fontSize: 22, fontWeight: '800' }]}>{bankDetails.accountNumber}</Text>
          </View>
        </View>
      )}

      {/* Receipt Upload */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="cloud-upload" size={24} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Upload Receipt</Text>
        </View>
        <TouchableOpacity style={styles.uploadBtn} onPress={pickReceipt} activeOpacity={0.8}>
          {receipt ? (
            <View style={styles.uploadedRow}>
              <Ionicons name="checkmark-circle" size={28} color={COLORS.success} />
              <Text style={styles.uploadedText}>Receipt selected</Text>
              <TouchableOpacity onPress={() => setReceipt(null)}>
                <Ionicons name="close-circle" size={22} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={44} color={COLORS.primary} />
              <Text style={styles.uploadText}>Tap to upload receipt</Text>
              <Text style={styles.uploadHint}>PNG or JPG, max 5MB</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Steps */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What Happens Next?</Text>
        {[
          'Transfer the exact amount to the bank account',
          'Screenshot the successful transfer receipt',
          'Upload the receipt using the form above',
          'Our team reviews and activates access (usually within 12 hours)',
          'You\'ll receive a confirmation once approved',
        ].map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>{i + 1}</Text></View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.submitBtn, (!receipt || uploading) && styles.submitDisabled]}
        onPress={submitPayment}
        disabled={!receipt || uploading}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={(!receipt || uploading) ? [COLORS.textMuted, COLORS.textMuted] : [COLORS.primary, COLORS.primaryDark]}
          style={styles.submitGrad}
        >
          {uploading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.submitText}>Submit Payment</Text>}
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.note}>All payments are non-refundable. Please verify all details before transferring.</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  scroll: { paddingHorizontal: SPACING.lg, paddingTop: 60 },
  center: { flex: 1, backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center' },
  backBtn: { marginBottom: SPACING.md },
  title: { color: COLORS.text, fontSize: 28, fontWeight: '800', marginBottom: 4 },
  subtitle: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md, marginBottom: SPACING.lg },
  card: { backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  cardTitle: { color: COLORS.text, fontSize: 17, fontWeight: '700' },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  summaryLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md },
  summaryValue: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
  bankItem: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  bankLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md },
  bankValue: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '600' },
  uploadBtn: {
    borderWidth: 2, borderColor: COLORS.border, borderStyle: 'dashed',
    borderRadius: RADIUS.md, padding: SPACING.xl, alignItems: 'center', gap: 8,
  },
  uploadText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md },
  uploadHint: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm },
  uploadedRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  uploadedText: { color: COLORS.success, fontSize: FONT_SIZE.lg, fontWeight: '600', flex: 1 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  stepNum: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.primary + '20',
    justifyContent: 'center', alignItems: 'center',
  },
  stepNumText: { color: COLORS.primary, fontSize: FONT_SIZE.xs, fontWeight: '800' },
  stepText: { flex: 1, color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20 },
  submitBtn: { borderRadius: RADIUS.lg, overflow: 'hidden', marginTop: 8 },
  submitDisabled: { opacity: 0.5 },
  submitGrad: { paddingVertical: 18, alignItems: 'center' },
  submitText: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  note: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, textAlign: 'center', marginTop: SPACING.md },
});
