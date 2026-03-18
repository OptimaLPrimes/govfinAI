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
    // Attempt to initialize Auth, but handle invalid configurations gracefully
    auth = getAuth(app);
  } catch (e) {
    console.warn("Firebase Auth failed to initialize. Falling back to mock for demo purposes.");
    // Provide a minimal mock to prevent crashing the entire React tree
    auth = { 
      app,
      onAuthStateChanged: (cb: any) => {
        // Return dummy unsubscribe
        return () => {};
      },
      signOut: async () => {
        return Promise.resolve();
      },
    } as unknown as Auth;
  }

  return { app, db, auth };
}

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
