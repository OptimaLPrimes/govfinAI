'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

/**
 * Initializes Firebase and provides a robust mock Auth object.
 * Ensuring the app never crashes even if configuration is missing.
 */
export function initializeFirebase(): { app: FirebaseApp; db: Firestore; auth: Auth } {
  let app: any;
  let db: any;
  
  try {
    // Check if configuration is at least partially valid
    const isValidConfig = firebaseConfig.projectId && firebaseConfig.projectId !== "undefined";
    
    if (isValidConfig) {
      app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      db = getFirestore(app);
    } else {
      console.warn("Firebase Project ID is missing. Running in local-only demo mode.");
      app = { options: {} } as any;
      db = {} as any;
    }
  } catch (error) {
    console.error("Firebase Services failed to initialize:", error);
    app = { options: {} } as any;
    db = {} as any;
  }
  
  // Mock Auth system - Always present to prevent 'undefined' crashes
  const auth = {
    app,
    currentUser: {
      uid: 'public-demo-user',
      displayName: 'Gov Visitor',
      email: 'visitor@govfin.ai',
      photoURL: 'https://picsum.photos/seed/visitor/100/100',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'mock-token',
      getIdTokenResult: async () => ({}) as any,
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: null,
    } as any,
    onAuthStateChanged: (callback: (user: any) => void) => {
      callback({
        uid: 'public-demo-user',
        displayName: 'Gov Visitor',
        email: 'visitor@govfin.ai',
        photoURL: 'https://picsum.photos/seed/visitor/100/100'
      });
      return () => {}; 
    },
    onIdTokenChanged: (callback: any) => {
      callback({ uid: 'public-demo-user' });
      return () => {};
    },
    signOut: async () => Promise.resolve(),
    authStateReady: async () => Promise.resolve(),
  } as unknown as Auth;

  return { app, db, auth };
}

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
