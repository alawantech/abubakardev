export const sendAdminNotification = async (formData, source) => {
    // We now call our Secure Firebase Cloud Function instead of the API directly
    const CLOUD_FUNCTION_URL = import.meta.env.VITE_FIREBASE_NOTIFICATIONS_URL ||
        'https://us-central1-abubakardev-b43b5.cloudfunctions.net/sendContactNotification';

    try {
        const response = await fetch(CLOUD_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formData,
                source
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Cloud Function Error: ${JSON.stringify(error)}`);
        }

        console.log('Notification request sent to Cloud Function successfully');
    } catch (error) {
        console.error('Failed to trigger email notification:', error);
    }
};
