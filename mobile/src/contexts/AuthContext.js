import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const unsubUserRef = { current: null };

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        unsubUserRef.current = onSnapshot(
          userRef,
          (snap) => {
            if (snap.exists()) {
              setUserData({ id: snap.id, ...snap.data() });
            }
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        );
      } else {
        if (unsubUserRef.current) {
          unsubUserRef.current();
          unsubUserRef.current = null;
        }
        setUserData(null);
        setLoading(false);
      }
    });

    const timeout = setTimeout(() => setLoading(false), 10000);

    return () => {
      clearTimeout(timeout);
      unsubAuth();
      if (unsubUserRef.current) unsubUserRef.current();
    };
  }, []);

  async function signOut() {
    if (unsubUserRef.current) {
      unsubUserRef.current();
      unsubUserRef.current = null;
    }
    await firebaseSignOut(auth);
    setCurrentUser(null);
    setUserData(null);
  }

  const value = {
    currentUser,
    userData,
    loading,
    signOut,
    isAuthenticated: !!currentUser,
    isAdmin: userData?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
