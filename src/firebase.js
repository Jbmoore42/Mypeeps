import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCwc-GcqO1aMidxeAMM9yGERVJxNPc_T0",
  authDomain: "my-peeps-6458b.firebaseapp.com",
  projectId: "my-peeps-6458b",
  storageBucket: "my-peeps-6458b.firebasestorage.app",
  messagingSenderId: "393836218871",
  appId: "1:393836218871:web:bdf59d277f78d76dc9c6f2",
  measurementId: "G-J72GEE9TZS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 