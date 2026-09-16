import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubUser = null;
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        unsubUser = onSnapshot(
          userRef,
          (snap) => {
            if (snap.exists()) {
              setUserData({ id: snap.id, ...snap.data() });
            }
            setLoading(false);
          },
          () => {
            getDoc(userRef).then((s) => {
              if (s.exists()) setUserData({ id: s.id, ...s.data() });
              setLoading(false);
            }).catch(() => setLoading(false));
          }
        );
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    const timeout = setTimeout(() => setLoading(false), 10000);

    return () => {
      clearTimeout(timeout);
      unsubAuth();
      if (unsubUser) unsubUser();
    };
  }, []);

  async function signOut() {
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
