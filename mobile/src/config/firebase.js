import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDQPzAFoyf7tBg3tHAo-8SJZfquXv7MpOI',
  authDomain: 'abubakardev-b43b5.firebaseapp.com',
  projectId: 'abubakardev-b43b5',
  storageBucket: 'abubakardev-b43b5.firebasestorage.app',
  messagingSenderId: '801623264205',
  appId: '1:801623264205:web:a88095b412555068721284',
  measurementId: 'G-832FQZEH3W',
};

let app, auth, db, storage;

try {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.error('Firebase init error:', error);
}

export { app, auth, db, storage };
