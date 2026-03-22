'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

/**
 * Initializes Firebase and provides a mock Auth object to remove the authentication requirement.
 */
export function initializeFirebase(): { app: FirebaseApp; db: Firestore; auth: Auth } {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  // Mock Auth system to remove the requirement for actual login
  const auth = {
    app,
    currentUser: {
      uid: 'public-demo-user',
      displayName: 'Gov Visitor',
      email: 'visitor@govfin.ai',
      photoURL: 'https://picsum.photos/seed/visitor/100/100'
    },
    onAuthStateChanged: (callback: (user: any) => void) => {
      // Immediately notify the application that a "user" is always logged in
      callback({
        uid: 'public-demo-user',
        displayName: 'Gov Visitor',
        email: 'visitor@govfin.ai',
        photoURL: 'https://picsum.photos/seed/visitor/100/100'
      });
      return () => {}; // Return no-op unsubscribe
    },
    signOut: async () => {
      console.log("Authentication is disabled. Sign out is a no-op.");
      return Promise.resolve();
    },
  } as unknown as Auth;

  return { app, db, auth };
}

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
