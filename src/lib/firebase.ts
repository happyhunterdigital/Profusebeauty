// File: src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Safe reference to Vite's environment variables to prevent TS compiler errors in clean builds
const env = (import.meta as any).env || {};

// Configure Firebase with production project defaults, allowing overrides via environment variables
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "profusebeauty-682fb.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "profusebeauty-682fb",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "profusebeauty-682fb.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Functions and get a reference to the service
export const functions = getFunctions(app);
