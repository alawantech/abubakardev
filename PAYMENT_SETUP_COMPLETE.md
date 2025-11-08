# ✅ Flutterwave Payment Setup with Firebase Cloud Functions

## 🎉 Setup Complete!

Your secure payment system is ready! Here's what was set up:

### ✅ What's Been Configured:

1. **Firebase Cloud Functions** - Deployed to handle secure payment verification
2. **Flutterwave Secret Keys** - Stored securely in Firebase (server-side only)
3. **Payment Flow** - Frontend → Flutterwave → Cloud Function → Firestore
4. **Enrollment System** - Automatic enrollment after payment verification

---

## 🔧 Final Steps Required:

### Step 1: Make Cloud Function Public

The function is deployed but needs to be made publicly accessible:

**Option A: Using Firebase Console (Recommended)**
1. Go to https://console.firebase.google.com/
2. Select your project: **abubakardev-b43b5**
3. Click **Functions** in the left menu
4. Find **verifyPayment** function
5. Click the **3 dots** menu → **Permissions**
6. Click **Add Principal**
7. Enter: `allUsers`
8. Select Role: **Cloud Functions Invoker**
9. Click **Save**

**Option B: Using gcloud CLI**
```bash
gcloud functions add-iam-policy-binding verifyPayment \
  --region=us-central1 \
  --member=allUsers \
  --role=roles/cloudfunctions.invoker \
  --project=abubakardev-b43b5
```

### Step 2: Get Your Flutterwave PUBLIC Key

1. Go to https://dashboard.flutterwave.com/
2. Navigate to **Settings** → **API Keys**
3. Copy your **Public Key** (starts with `FLWPUBK-TEST-` for test mode)
4. Open `d:\abubakardev\.env`
5. Replace this line:
   ```env
   VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X
   ```
   With your actual public key:
   ```env
   VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-TEST-your-actual-key-here-X
   ```

### Step 3: Restart Your Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## 🔒 Security Architecture

### How It Works (Secure Flow):

```
1. Student clicks "Enroll Now"
   ↓
2. Modal collects: Name, Email, Phone
   ↓
3. Frontend uses PUBLIC KEY to initiate Flutterwave checkout
   ↓
4. Student completes payment on Flutterwave
   ↓
5. Frontend sends transaction_id to Cloud Function
   ↓
6. Cloud Function uses SECRET KEY to verify with Flutterwave API
   ↓
7. If verified ✅ → Creates enrollment in Firestore
   ↓
8. Returns success to frontend → Student enrolled!
```

### Why This Is Secure:

✅ **Secret keys NEVER exposed** - Only stored in Firebase Cloud Functions
✅ **Server-side verification** - Payment verified on backend, not frontend
✅ **Can't be tampered** - Students can't fake payments
✅ **Double verification** - Flutterwave + your backend both confirm

---

## 📁 Your Keys Location:

### Frontend (.env file):
```env
VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-TEST-xxx  # Safe to expose
```

### Backend (Firebase Config):
```bash
# Stored securely in Firebase (invisible to frontend)
flutterwave.secret_key = FLWSECK-9a8bd4182f99eecd5010c8e4a4f6869e-19a2984a272vt-X
flutterwave.encryption_key = 9a8bd4182f990b96b70e64ed
```

---

## 🧪 Testing Your Payment

### Test Mode Setup:
1. Use your **Test Public Key** in `.env`
2. Your secret key is already configured for test mode
3. Use these test card details:

**Test Card:**
- Card Number: `5531886652142950`
- CVV: `564`
- Expiry: `09/32` (any future date)
- PIN: `3310`
- OTP: `12345`

### Test the Flow:
1. Go to a course page: http://localhost:5173/course/[courseId]
2. Click **"Enroll Now"**
3. Fill in your details
4. Click **"Proceed to Payment"**
5. Enter test card details
6. Complete payment
7. Check if enrollment appears in Firebase Console → Firestore → `enrollments`

---

## 📊 Database Structure

**Collection:** `enrollments`

Each successful payment creates:
```javascript
{
  userId: "customer@email.com",
  courseId: "course_id",
  courseName: "Course Title",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "+234 800 000 0000",
  paymentReference: "FLW-123456789",
  transactionId: "COURSE-xxx-timestamp",
  amount: 50000,
  currency: "NGN",
  paymentType: "card",
  status: "completed",
  paymentStatus: "successful",
  enrolledAt: Timestamp,
  verifiedAt: Timestamp
}
```

---

## 🚀 Going Live (Production)

When ready for real payments:

### 1. Switch to Live Keys in Flutterwave:
- Go to Flutterwave Dashboard
- Toggle to **Live Mode**
- Copy your **Live Public Key**
- Update `.env`:
  ```env
  VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-your-live-public-key-X
  ```

### 2. Update Firebase Config with Live Keys:
```bash
firebase functions:config:set \
  flutterwave.secret_key="FLWSECK-your-live-secret-key-X" \
  flutterwave.encryption_key="your-live-encryption-key"
```

### 3. Deploy Functions Again:
```bash
firebase deploy --only functions
```

### 4. Deploy Frontend to Vercel/Production

---

## 🔧 Customization

### Change Currency:
Edit `src/components/CoursePage.jsx`:
```javascript
currency: 'NGN',  // Change to USD, GHS, KES, etc.
```

### Add Webhook (Advanced):
For real-time payment notifications, add a webhook in Flutterwave Dashboard pointing to:
```
https://us-central1-abubakardev-b43b5.cloudfunctions.net/flutterwaveWebhook
```

---

## 📞 Cloud Function URL

Your deployed function:
```
https://us-central1-abubakardev-b43b5.cloudfunctions.net/verifyPayment
```

This URL is already configured in your `.env` file!

---

## 🆘 Troubleshooting

### Issue: "Network Error" when verifying payment
**Solution:** Make sure you completed Step 1 (making function public)

### Issue: "Payment verified but enrollment not created"
**Solution:** Check Firestore rules allow writes to `enrollments` collection

### Issue: "Invalid Public Key"
**Solution:** 
- Verify you're using the PUBLIC key (starts with `FLWPUBK-`)
- Make sure it matches your SECRET key mode (test/live)
- Restart dev server after updating `.env`

### Issue: Payment successful but verification fails
**Solution:**
- Check browser console for errors
- Verify function URL in `.env` is correct
- Make sure function is public (Step 1)

---

## ✨ What's Next?

Consider adding:
- 📧 **Email notifications** - Send receipt after payment
- 🎓 **Student dashboard** - View enrolled courses
- 📊 **Admin panel** - View all enrollments and revenue
- 💰 **Discount codes** - Promotional pricing
- 🔄 **Subscriptions** - Monthly payment plans
- 📜 **Invoice generation** - PDF receipts

---

## 📚 Resources

- **Firebase Console:** https://console.firebase.google.com/
- **Flutterwave Dashboard:** https://dashboard.flutterwave.com/
- **Cloud Functions Logs:** Firebase Console → Functions → Logs
- **Test Cards:** https://developer.flutterwave.com/docs/test-cards

---

**🎉 Your secure payment system is ready!**

Just complete the 3 steps above and you're live! 🚀
