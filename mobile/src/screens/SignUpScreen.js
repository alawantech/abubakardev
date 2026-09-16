import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../utils/theme';

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!fullName.trim() || !email.trim() || !whatsapp.trim() || !password || !confirm) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (whatsapp.replace(/\D/g, '').length < 10) {
      Alert.alert('Error', 'Enter a valid WhatsApp number');
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        fullName: fullName.trim(),
        email: email.trim(),
        whatsappNumber: whatsapp.trim(),
        role: 'student',
        createdAt: serverTimestamp(),
        uid: cred.user.uid,
      });
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    } catch (err) {
      let msg = 'Registration failed. Try again.';
      if (err.code === 'auth/email-already-in-use') msg = 'An account with this email already exists';
      else if (err.code === 'auth/invalid-email') msg = 'Invalid email address';
      else if (err.code === 'auth/weak-password') msg = 'Password is too weak';
      Alert.alert('Sign Up Failed', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logoSmall}>
            <Text style={styles.logoText}>Z</Text>
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join ZedroTech Academy today</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="person-outline" size={20} color={COLORS.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor={COLORS.textMuted}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={COLORS.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <Text style={styles.label}>WhatsApp Number</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="logo-whatsapp" size={20} color={COLORS.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="+234 800 000 0000"
              placeholderTextColor={COLORS.textMuted}
              value={whatsapp}
              onChangeText={setWhatsapp}
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Min 8 characters"
              placeholderTextColor={COLORS.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Re-enter password"
              placeholderTextColor={COLORS.textMuted}
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={!showPass}
            />
          </View>

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleSignUp}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.btnText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>
              Already have an account? <Text style={styles.linkBold}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: 60, paddingBottom: 40 },
  backBtn: { marginBottom: SPACING.lg },
  header: { alignItems: 'center', marginBottom: SPACING.xl },
  logoSmall: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md,
  },
  logoText: { color: COLORS.white, fontSize: 28, fontWeight: '800' },
  title: { color: COLORS.text, fontSize: FONT_SIZE.title, fontWeight: '800' },
  subtitle: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md, marginTop: 4 },
  form: { gap: 4 },
  label: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, fontWeight: '600', marginTop: SPACING.sm },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bgInput,
    borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, gap: SPACING.sm, height: 52,
  },
  input: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.lg },
  btn: {
    backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: 16,
    alignItems: 'center', marginTop: SPACING.lg,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: COLORS.white, fontSize: FONT_SIZE.lg, fontWeight: '700' },
  link: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md, textAlign: 'center', marginTop: SPACING.lg },
  linkBold: { color: COLORS.primaryLight, fontWeight: '700' },
});
