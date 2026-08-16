import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeAuth;
    let unsubscribeProfile;

    if (!auth) {
      setLoading(false);
      return;
    }

    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 10000);

    unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user && db) {
        // Clean up previous profile listener if any
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }

        // Use onSnapshot for real-time profile, with getDoc fallback on connection error
        const fetchProfileOnce = async (retries = 1) => {
          try {
            const snap = await getDoc(doc(db, 'users', user.uid));
            if (snap.exists()) {
              setUserData({ uid: snap.id, ...snap.data() });
            } else {
              setUserData({ uid: user.uid, email: user.email });
            }
          } catch (e) {
            console.warn('Profile fetch error:', e.message);
            if (retries > 0) {
              await new Promise(r => setTimeout(r, 2000));
              return fetchProfileOnce(retries - 1);
            }
            setUserData({ uid: user.uid, email: user.email });
          }
          setLoading(false);
          clearTimeout(safetyTimeout);
        };

        unsubscribeProfile = onSnapshot(
          doc(db, 'users', user.uid),
          (snapshot) => {
            if (snapshot.exists()) {
              setUserData({ uid: snapshot.id, ...snapshot.data() });
            } else {
              setUserData({ uid: user.uid, email: user.email });
            }
            setLoading(false);
            clearTimeout(safetyTimeout);
          },
          (err) => {
            console.warn('Firestore listener failed, using fallback:', err.message);
            // onSnapshot failed (QUIC/network issue) — fall back to one-time read
            unsubscribeProfile = null;
            fetchProfileOnce();
          }
        );
      } else {
        setUserData(null);
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }
        setLoading(false);
        clearTimeout(safetyTimeout);
      }
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
      clearTimeout(safetyTimeout);
    };
  }, []);

  const signOut = async () => {
    try {
      if (auth) {
        await firebaseSignOut(auth);
      }
      setCurrentUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userData,
    loading,
    signOut,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
