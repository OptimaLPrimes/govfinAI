'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../provider';

/**
 * Hook to access the current (mocked) user.
 */
export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<any>(auth.currentUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In the removed auth system, the user is static and always available
    setUser(auth.currentUser);
    setLoading(false);
  }, [auth]);

  return { user, loading };
}
