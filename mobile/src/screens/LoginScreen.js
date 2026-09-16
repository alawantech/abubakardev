import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../utils/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const snap = await getDoc(doc(db, 'users', cred.user.uid));
      if (snap.exists() && snap.data().role === 'admin') {
        navigation.reset({ index: 0, routes: [{ name: 'Admin' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
      }
    } catch (err) {
      let msg = 'Login failed. Please try again.';
      if (err.code === 'auth/user-not-found') msg = 'No account found with this email';
      else if (err.code === 'auth/wrong-password') msg = 'Incorrect password';
      else if (err.code === 'auth/invalid-email') msg = 'Invalid email address';
      else if (err.code === 'auth/too-many-requests') msg = 'Too many attempts. Try again later';
      else if (err.code === 'auth/invalid-credential') msg = 'Invalid email or password';
      Alert.alert('Login Failed', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSmall}>
            <Text style={styles.logoText}>Z</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to your ZedroTech Academy account</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={[styles.inputWrap, focusedField === 'email' && styles.inputFocused]}>
            <Ionicons name="mail-outline" size={20} color={focusedField === 'email' ? COLORS.primary : COLORS.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor={COLORS.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View style={[styles.inputWrap, focusedField === 'pass' && styles.inputFocused]}>
            <Ionicons name="lock-closed-outline" size={20} color={focusedField === 'pass' ? COLORS.primary : COLORS.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              onFocus={() => setFocusedField('pass')}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={22} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={loading ? [COLORS.textMuted, COLORS.textMuted] : [COLORS.primary, COLORS.primaryDark]}
              style={styles.btnGrad}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <>
                  <Text style={styles.btnText}>Log In</Text>
                  <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerHint}>
            Use the same email and password you use on school.zdrotech.com
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  scroll: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: 50, paddingBottom: 40 },
  backBtn: { marginBottom: SPACING.lg, width: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  logoSmall: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.lg,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 20, elevation: 10,
  },
  logoText: { color: COLORS.white, fontSize: 32, fontWeight: '900' },
  title: { color: COLORS.text, fontSize: 30, fontWeight: '800' },
  subtitle: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md, marginTop: 6 },
  form: { gap: 14 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg, paddingHorizontal: SPACING.md, gap: SPACING.sm,
    height: 56, borderWidth: 1.5, borderColor: 'transparent',
  },
  inputFocused: { borderColor: COLORS.primary },
  input: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.lg },
  btn: { borderRadius: RADIUS.lg, overflow: 'hidden', marginTop: 8 },
  btnDisabled: { opacity: 0.6 },
  btnGrad: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    paddingVertical: 18,
  },
  btnText: { color: COLORS.white, fontSize: FONT_SIZE.xl, fontWeight: '700' },
  footer: { marginTop: SPACING.xl, alignItems: 'center' },
  footerHint: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm, textAlign: 'center' },
});
