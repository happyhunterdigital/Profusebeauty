/// <reference types="vite/client" />

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator, type Functions } from 'firebase/functions'

const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
] as const

// ─── DEBUG: Log which env vars are present/missing ───
const missingVars = requiredEnvVars.filter((key) => !import.meta.env[key])
const presentVars = requiredEnvVars.filter((key) => !!import.meta.env[key])

console.log('[Firebase Debug] Present env vars:', presentVars)
console.log('[Firebase Debug] Missing env vars:', missingVars)

if (missingVars.length > 0) {
  console.error(
    '[Firebase Debug] ❌ CRITICAL: Missing required Firebase env variables:',
    missingVars
  )
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// ─── DEBUG: Log config object (mask the API key) ───
console.log('[Firebase Debug] Config projectId:', firebaseConfig.projectId)
console.log('[Firebase Debug] Config authDomain:', firebaseConfig.authDomain)
console.log(
  '[Firebase Debug] API Key loaded?',
  firebaseConfig.apiKey ? `YES (ends with ...${firebaseConfig.apiKey.slice(-4)})` : 'NO'
)

let app: FirebaseApp
let db: Firestore
let functions: Functions

try {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error(
      `Firebase cannot initialize: missing apiKey or projectId. ` +
        `Check that your .env file is loaded and variables start with VITE_.`
    )
  }

  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  console.log('[Firebase Debug] ✅ Firebase app initialized successfully')

  db = getFirestore(app)
  console.log('[Firebase Debug] ✅ Firestore instance created')

  functions = getFunctions(app)
  console.log('[Firebase Debug] ✅ Functions instance created')

  // Optional: connect to emulators in development
  if (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true') {
    connectFirestoreEmulator(db, 'localhost', 8080)
    connectFunctionsEmulator(functions, 'localhost', 5001)
    console.log('[Firebase Debug] 🔧 Connected to Firebase emulators')
  }
} catch (err) {
  console.error('[Firebase Debug] ❌ Firebase initialization failed:', err)
  // Re-throw so the app knows it failed — don't silently fall back to DEMO mode
  throw err
}

export { db, functions }
export default app
