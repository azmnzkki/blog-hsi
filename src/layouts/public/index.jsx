'use client';

import Box from '@mui/material/Box';

import { PublicNav } from './nav';
import { PublicFooter } from './footer';

// ----------------------------------------------------------------------

/**
 * Public Layout Component
 * Wrapper untuk halaman publik (news portal)
 * Includes: Navbar, Main Content, Footer
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Main content
 * @param {string} props.layoutQuery - Breakpoint untuk responsive design (default: 'md')
 * @param {Object} props.sx - Additional styles
 * @returns {React.ReactElement}
 */
export function PublicLayout({ children, layoutQuery = 'md', sx, ...other }) {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#FFFFFF',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* Navbar */}
      <PublicNav layoutQuery={layoutQuery} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <PublicFooter layoutQuery={layoutQuery} />
    </Box>
  );
}

export * from './nav';
export * from './footer';
