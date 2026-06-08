'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { DashboardLayout } from 'src/layouts/dashboard';
import { getMockAuthUser } from 'src/utils/mock-auth';
import { navDataHSI } from '../nav-config-hsi';

// -----------------------------------------------

/**
 * HSI News Portal Dashboard Layout Wrapper
 * Adds:
 * - HSI-specific navigation config
 * - Username display in header
 * - Mock authentication guard
 */
export function DashboardHSILayout({ children, slotProps: slotPropsProp }) {
  const router = useRouter();

  // Use state to avoid SSR mismatch (localStorage only available client-side)
  const [currentUser, setCurrentUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const user = getMockAuthUser();
    setCurrentUser(user);
    setIsChecking(false);

    // Auth guard: redirect to login if no user
    if (!user) {
      router.push('/auth/jwt/sign-in');
    }
  }, [router]);

  if (isChecking || !currentUser) {
    return null;
  }

  // Merge HSI nav config with existing slotProps
  const slotProps = {
    ...slotPropsProp,
    nav: {
      ...slotPropsProp?.nav,
      data: navDataHSI,
    },
    header: {
      ...slotPropsProp?.header,
      slots: {
        ...slotPropsProp?.header?.slots,
        // Add user info to right area
        rightAreaPrefix: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 2 }}>
            <Avatar
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              sx={{ width: 36, height: 36 }}
            />
            <Box sx={{ textAlign: 'right', minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
                {currentUser.name}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>
                {currentUser.role}
              </Typography>
            </Box>
          </Box>
        ),
      },
    },
  };

  return <DashboardLayout slotProps={slotProps}>{children}</DashboardLayout>;
}
