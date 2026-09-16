import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, TextInput, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword, deleteUser } from 'firebase/auth';
import { db, auth } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../utils/theme';

export default function ProfileScreen({ navigation }) {
  const { currentUser, userData, signOut } = useAuth();
  const [editing, setEditing] = useState(false);
  const [changingPass, setChangingPass] = useState(false);
  const [fullName, setFullName] = useState(userData?.fullName || '');
  const [whatsapp, setWhatsapp] = useState(userData?.whatsappNumber || '');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSaveProfile() {
    if (!fullName.trim()) { Alert.alert('Error', 'Name is required'); return; }
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        fullName: fullName.trim(),
        whatsappNumber: whatsapp.trim(),
      });
      setEditing(false);
      Alert.alert('Success', 'Profile updated');
    } catch { Alert.alert('Error', 'Failed to update profile'); }
    finally { setSaving(false); }
  }

  async function handleChangePassword() {
    if (!currentPass) { Alert.alert('Error', 'Enter your current password'); return; }
    if (newPass.length < 8) { Alert.alert('Error', 'New password must be at least 8 characters'); return; }
    if (newPass !== confirmPass) { Alert.alert('Error', 'Passwords do not match'); return; }
    setSaving(true);
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPass);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPass);
      setChangingPass(false);
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      Alert.alert('Success', 'Password changed successfully');
    } catch (err) {
      if (err.code === 'auth/wrong-password') Alert.alert('Error', 'Current password is incorrect');
      else Alert.alert('Error', 'Failed to change password');
    } finally { setSaving(false); }
  }

  function handleLogout() {
    Alert.alert('Log Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: signOut },
    ]);
  }

  function handleDeleteAccount() {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account, all your course progress, and payment history. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'users', currentUser.uid));
              await deleteUser(currentUser);
              Alert.alert('Deleted', 'Your account has been deleted.');
            } catch (err) {
              if (err.code === 'auth/requires-recent-login') {
                Alert.alert('Re-authentication Required', 'Please log out and log back in, then try deleting your account again.');
              } else {
                Alert.alert('Error', 'Failed to delete account. Please try again.');
              }
            }
          },
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* Header */}
      <LinearGradient colors={['#0f172a', '#162033']} style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userData?.fullName?.charAt(0)?.toUpperCase() || '?'}</Text>
        </View>
        <Text style={styles.name}>{userData?.fullName || 'Student'}</Text>
        <Text style={styles.email}>{userData?.email}</Text>
        {userData?.role === 'admin' && (
          <View style={styles.adminBadge}>
            <Ionicons name="shield-checkmark" size={12} color={COLORS.warning} />
            <Text style={styles.adminText}>Admin</Text>
          </View>
        )}
      </LinearGradient>

      {/* Profile Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile Information</Text>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Full Name</Text>
          {editing ? (
            <TextInput style={styles.fieldInput} value={fullName} onChangeText={setFullName} placeholder="Your name" placeholderTextColor={COLORS.textMuted} />
          ) : (
            <Text style={styles.fieldValue}>{userData?.fullName || '-'}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Email</Text>
          <Text style={styles.fieldValue}>{userData?.email}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>WhatsApp</Text>
          {editing ? (
            <TextInput style={styles.fieldInput} value={whatsapp} onChangeText={setWhatsapp} placeholder="+234..." placeholderTextColor={COLORS.textMuted} keyboardType="phone-pad" />
          ) : (
            <Text style={styles.fieldValue}>{userData?.whatsappNumber || '-'}</Text>
          )}
        </View>

        {editing ? (
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => { setEditing(false); setFullName(userData?.fullName || ''); setWhatsapp(userData?.whatsappNumber || ''); }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveBtn, saving && { opacity: 0.6 }]} onPress={handleSaveProfile} disabled={saving}>
              <Text style={styles.saveText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
            <Ionicons name="create-outline" size={18} color={COLORS.primary} />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Change Password */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardHeader} onPress={() => setChangingPass(!changingPass)}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.text} />
          <Text style={styles.cardTitle}>Change Password</Text>
          <Ionicons name={changingPass ? 'chevron-up' : 'chevron-down'} size={18} color={COLORS.textMuted} />
        </TouchableOpacity>

        {changingPass && (
          <>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Current Password</Text>
              <View style={styles.passWrap}>
                <TextInput style={styles.passInput} value={currentPass} onChangeText={setCurrentPass} secureTextEntry={!showPass} placeholder="Enter current password" placeholderTextColor={COLORS.textMuted} />
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>New Password (min 8 characters)</Text>
              <View style={styles.passWrap}>
                <TextInput style={styles.passInput} value={newPass} onChangeText={setNewPass} secureTextEntry={!showPass} placeholder="Enter new password" placeholderTextColor={COLORS.textMuted} />
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Confirm New Password</Text>
              <View style={styles.passWrap}>
                <TextInput style={styles.passInput} value={confirmPass} onChangeText={setConfirmPass} secureTextEntry={!showPass} placeholder="Re-enter new password" placeholderTextColor={COLORS.textMuted} />
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                  <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.textMuted} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={[styles.saveBtn, { marginTop: 8 }, saving && { opacity: 0.6 }]} onPress={handleChangePassword} disabled={saving}>
              <Text style={styles.saveText}>{saving ? 'Changing...' : 'Change Password'}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Quick Links */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.getParent()?.navigate('Home')}>
          <Ionicons name="home-outline" size={22} color={COLORS.text} />
          <Text style={styles.menuText}>Dashboard</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL('https://wa.me/2348156853636')}>
          <Ionicons name="logo-whatsapp" size={22} color={COLORS.success} />
          <Text style={styles.menuText}>WhatsApp Support</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL('https://school.zdrotech.com')}>
          <Ionicons name="globe-outline" size={22} color={COLORS.text} />
          <Text style={styles.menuText}>Visit Website</Text>
          <Ionicons name="open-outline" size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Legal */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL('https://school.zdrotech.com/privacy')}>
          <Ionicons name="shield-checkmark-outline" size={22} color={COLORS.text} />
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Ionicons name="open-outline" size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL('https://school.zdrotech.com/terms')}>
          <Ionicons name="document-text-outline" size={22} color={COLORS.text} />
          <Text style={styles.menuText}>Terms & Conditions</Text>
          <Ionicons name="open-outline" size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>ZedroTech Academy v1.0</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  scroll: { paddingHorizontal: SPACING.lg, paddingTop: 60 },
  header: { alignItems: 'center', borderRadius: RADIUS.xl, padding: SPACING.xl, marginBottom: SPACING.md },
  avatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 10,
  },
  avatarText: { color: COLORS.white, fontSize: 36, fontWeight: '800' },
  name: { color: COLORS.text, fontSize: 22, fontWeight: '800' },
  email: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md, marginTop: 4 },
  adminBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.warning + '20',
    borderRadius: RADIUS.sm, paddingHorizontal: 10, paddingVertical: 3, marginTop: 10,
  },
  adminText: { color: COLORS.warning, fontSize: FONT_SIZE.xs, fontWeight: '700' },
  card: { backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  cardTitle: { color: COLORS.text, fontSize: 17, fontWeight: '700', flex: 1 },
  field: { marginTop: 12 },
  fieldLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, fontWeight: '600', marginBottom: 6 },
  fieldValue: { color: COLORS.text, fontSize: FONT_SIZE.lg },
  fieldInput: {
    backgroundColor: COLORS.bgInput, borderRadius: RADIUS.md, padding: 14,
    color: COLORS.text, fontSize: FONT_SIZE.lg,
  },
  passWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bgInput,
    borderRadius: RADIUS.md, paddingHorizontal: 14, gap: 8,
  },
  passInput: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.lg, height: 50 },
  editActions: { flexDirection: 'row', gap: 10, marginTop: 12 },
  cancelBtn: { flex: 1, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingVertical: 14, alignItems: 'center' },
  cancelText: { color: COLORS.textSecondary, fontWeight: '600' },
  saveBtn: { flex: 1, backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: 14, alignItems: 'center' },
  saveText: { color: COLORS.white, fontWeight: '700' },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  editText: { color: COLORS.primary, fontWeight: '600' },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  menuText: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.lg },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.error + '15', borderRadius: RADIUS.lg, paddingVertical: 16,
    marginBottom: SPACING.lg,
  },
  logoutText: { color: COLORS.error, fontSize: FONT_SIZE.lg, fontWeight: '700' },
  deleteBtn: { alignItems: 'center', paddingVertical: 14, marginBottom: SPACING.md },
  deleteText: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm, textDecorationLine: 'underline' },
  footer: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm, textAlign: 'center' },
});
