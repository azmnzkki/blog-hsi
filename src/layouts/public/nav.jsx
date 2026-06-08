'use client';

import { useState } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const NAV_ITEMS = [
  { label: 'Beranda', href: '/' },
  { label: 'Berita', href: '/posts?category=berita' },
  { label: 'Artikel', href: '/posts?category=artikel' },
  { label: 'Pengumuman', href: '/posts?category=pengumuman' },
];

// ----------------------------------------------------------------------

export function PublicNav({ layoutQuery = 'md' }) {
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: (theme) => theme.shadows[4],
          backgroundColor: '#FFFFFF',
          color: 'inherit',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 64,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Logo */}
            <Link
              component={RouterLink}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '1.25rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'primary.dark',
                },
              }}
            >
              <Iconify icon="solar:book-bold-duotone" width={32} height={32} />
              HSI News
            </Link>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: 'none', [layoutQuery]: 'flex' },
                gap: 0.5,
                ml: 'auto',
                mr: 3,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  href={item.href}
                  sx={{
                    color: 'text.primary',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    px: 2,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: 2,
                      backgroundColor: 'primary.main',
                      transform: 'translateX(-50%)',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '80%',
                    },
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Search Icon (Desktop) */}
            <IconButton
              size="large"
              sx={{
                display: { xs: 'none', [layoutQuery]: 'inline-flex' },
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(0, 167, 111, 0.08)',
                },
              }}
            >
              <Iconify icon="solar:magnifer-bold-duotone" width={24} />
            </IconButton>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={onOpen}
              sx={{
                display: { [layoutQuery]: 'none' },
                color: 'text.primary',
              }}
            >
              <Iconify icon="solar:hamburger-menu-bold-duotone" width={24} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          sx={{
            width: 280,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          role="presentation"
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1.1rem',
            }}
          >
            <Iconify icon="solar:book-bold-duotone" width={28} height={28} />
            HSI News
          </Box>

          <Divider />

          <List sx={{ flex: 1 }}>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  href={item.href}
                  onClick={onClose}
                  sx={{
                    py: 1.5,
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 167, 111, 0.08)',
                      color: 'primary.main',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <Box sx={{ p: 2 }}>
            <IconButton
              fullWidth
              startIcon={<Iconify icon="solar:magnifer-bold-duotone" width={20} />}
              sx={{
                justifyContent: 'center',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(0, 167, 111, 0.08)',
                },
              }}
            >
              Search
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
