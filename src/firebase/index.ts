'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase(): { app: FirebaseApp; db: Firestore; auth: Auth } {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  let auth: Auth;
  try {
    auth = getAuth(app);
  } catch (e) {
    // Fail gracefully if API key is invalid/missing, allowing demo mode
    console.warn("Firebase Auth failed to initialize. Ensure your API key is correct in src/firebase/config.ts");
    auth = { 
      app,
      onAuthStateChanged: (cb: any) => {
        // Return dummy unsubscribe
        return () => {};
      },
      signOut: async () => {},
    } as unknown as Auth;
  }

  return { app, db, auth };
}

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
