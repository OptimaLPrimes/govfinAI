'use client';

import { useState, useEffect } from 'react';
import {
  DocumentReference,
  onSnapshot,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

/**
 * Defensive hook for fetching a single document.
 */
export function useDoc<T = DocumentData>(docRef: DocumentReference<T> | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If docRef is null or its firestore instance is a mock/uninitialized, bail early
    if (!docRef || !docRef.firestore || (docRef.firestore as any).__isMock) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot: DocumentSnapshot<T>) => {
          setData(snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null);
          setLoading(false);
        },
        (err) => {
          console.error("Firestore useDoc error:", err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (e: any) {
      console.warn("Firestore listener failed to start:", e);
      setLoading(false);
    }
  }, [docRef]);

  return { data, loading, error };
}
