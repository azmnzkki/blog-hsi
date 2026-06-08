'use client';

import { useMemo } from 'react';
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

  // Get current mock auth user
  const currentUser = useMemo(() => getMockAuthUser(), []);

  // Auth guard: redirect to login if no user
  useMemo(() => {
    if (!currentUser) {
      router.push('/auth/jwt/sign-in');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null; // Will redirect
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
