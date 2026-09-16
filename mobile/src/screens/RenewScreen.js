import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, FONT_SIZE, RADIUS, SPACING, formatCurrency } from '../utils/theme';

export default function RenewScreen({ route, navigation }) {
  const { courseId, courseName, planType, planAmount } = route.params || {};
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
      const storageRef = ref(storage, `renewal-payments/${currentUser.uid}/${fileName}`);
      const response = await fetch(receipt.uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'payments'), {
        userId: currentUser.uid, customerEmail: currentUser.email,
        courseId, courseName, customerName: userData?.fullName,
        planType: planType || 'monthly', amount: planAmount || 0,
        receiptURL: downloadURL, status: 'pending',
        submittedAt: serverTimestamp(), paymentMethod: 'bank_transfer',
        receiptFileName: receipt.fileName || 'receipt',
        type: 'renewal', uploadSuccessful: true,
      });

      Alert.alert('Submitted', 'Your renewal receipt has been submitted for review.', [
        { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] }) },
      ]);
    } catch (err) {
      console.error('Renewal error:', err);
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

      <Text style={styles.title}>Renew Subscription</Text>
      <Text style={styles.subtitle}>Renew your access to {courseName}</Text>

      {/* Renewal Details */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="refresh-circle" size={28} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Renewal Details</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Course</Text>
          <Text style={styles.detailValue}>{courseName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Plan</Text>
          <Text style={styles.detailValue}>{planType === 'monthly' ? 'Monthly' : planType === 'yearly' ? 'Yearly' : 'One-Time'}</Text>
        </View>
        <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={[styles.detailValue, { color: COLORS.success, fontSize: 20, fontWeight: '800' }]}>
            {formatCurrency(planAmount)}
          </Text>
        </View>
      </View>

      {/* Bank Details */}
      {bankDetails && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="business" size={24} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Bank Transfer</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank</Text>
            <Text style={styles.detailValue}>{bankDetails.bankName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Name</Text>
            <Text style={styles.detailValue}>{bankDetails.accountName}</Text>
          </View>
          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Account Number</Text>
            <Text style={[styles.detailValue, { fontSize: 20, fontWeight: '800' }]}>{bankDetails.accountNumber}</Text>
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
              <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
              <Text style={styles.uploadedText}>Receipt selected</Text>
              <TouchableOpacity onPress={() => setReceipt(null)}>
                <Ionicons name="close-circle" size={20} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={40} color={COLORS.primary} />
              <Text style={styles.uploadText}>Tap to upload receipt</Text>
              <Text style={styles.uploadHint}>PNG or JPG, max 5MB</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* How to Pay */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How to Pay</Text>
        {[
          'Transfer the exact amount to the bank account above',
          'Take a screenshot of your payment receipt',
          'Upload the receipt using the form above',
          'Our team will review and activate your access',
          'You\'ll get a notification once approved',
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
          {uploading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.submitText}>Submit Renewal</Text>}
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.note}>All payments are non-refundable. Please verify details before transferring.</Text>
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
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: SPACING.md },
  cardTitle: { color: COLORS.text, fontSize: 17, fontWeight: '700' },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  detailLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md },
  detailValue: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
  uploadBtn: {
    borderWidth: 2, borderColor: COLORS.border, borderStyle: 'dashed',
    borderRadius: RADIUS.md, padding: SPACING.xl, alignItems: 'center', gap: 8,
  },
  uploadText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md },
  uploadHint: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm },
  uploadedRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  uploadedText: { color: COLORS.success, fontSize: FONT_SIZE.md, fontWeight: '600', flex: 1 },
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
