'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { CONFIG } from 'src/global-config';
import { getMockAuthUser } from 'src/utils/mock-auth';
import { SplashScreen } from 'src/components/loading-screen';

// -----------------------------------------------
// Mock-aware guest guard: if already logged in, redirect to dashboard.
// Replaces the original GuestGuard which required a real JWT API server.

function MockGuestGuard({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const user = getMockAuthUser();
    if (user) {
      const returnTo = searchParams.get('returnTo') || CONFIG.auth.redirectPath;
      router.replace(returnTo);
    } else {
      setIsChecking(false);
    }
  }, [router, searchParams]);

  if (isChecking) return <SplashScreen />;
  return <>{children}</>;
}

// -----------------------------------------------

export default function Layout({ children }) {
  return (
    <MockGuestGuard>
      <AuthSplitLayout
        slotProps={{
          section: {
            title: 'Selamat Datang di HSI News Portal',
            description: 'Platform berita dan artikel untuk HSI Boarding School',
          },
        }}
      >
        {children}
      </AuthSplitLayout>
    </MockGuestGuard>
  );
}
