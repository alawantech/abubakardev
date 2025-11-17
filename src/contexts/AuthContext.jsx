import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;
    
    // Check if Firebase auth is available
    if (!auth) {
      console.warn('Firebase auth not available, skipping auth initialization');
      setLoading(false);
      return;
    }
    
    try {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          setCurrentUser(user);
          
          if (user && db) {
            // Fetch additional user data from Firestore
            try {
              const userDoc = await getDoc(doc(db, 'users', user.uid));
              if (userDoc.exists()) {
                setUserData(userDoc.data());
              }
            } catch (firestoreError) {
              console.error('Error fetching user data:', firestoreError);
              // Don't set error for user data fetch failure, just log it
            }
          } else {
            setUserData(null);
          }
          
          setLoading(false);
        } catch (authError) {
          console.error('Auth state change error:', authError);
          setError(authError);
          setLoading(false);
        }
      });
    } catch (initError) {
      console.error('Firebase initialization error:', initError);
      setError(initError);
      setLoading(false);
    }

    // Fallback timeout in case Firebase never initializes
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('Firebase auth timeout - proceeding without auth');
        setLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      clearTimeout(timeout);
    };
  }, [loading]);

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
    error,
    signOut,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
