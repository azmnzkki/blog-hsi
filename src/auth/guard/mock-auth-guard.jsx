'use client';

import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';
import { getMockAuthUser } from 'src/utils/mock-auth';

// -----------------------------------------------

/**
 * Mock Authentication Guard for Phase A (UI)
 * In Phase B, this will be replaced with real Supabase Auth
 *
 * This guard checks if a user is authenticated using localStorage
 * If not authenticated, redirects to login page
 */
export function MockAuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = () => {
    try {
      const user = getMockAuthUser();

      if (user) {
        setIsAuthenticated(true);
        setIsChecking(false);
      } else {
        setIsAuthenticated(false);
        // Redirect to login
        const queryString = new URLSearchParams({ returnTo: pathname }).toString();
        const redirectPath = `${paths.auth.jwt.signIn}?${queryString}`;
        router.replace(redirectPath);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      router.replace(paths.auth.jwt.signIn);
    }
  };

  useEffect(() => {
    // Check authentication on mount
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isChecking) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return null; // Will redirect via the check above
  }

  return <>{children}</>;
}
