'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const FooterRoot = styled('footer')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.mode === 'light' ? '#F9FAFB' : theme.palette.background.paper,
  marginTop: 'auto',
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export function PublicFooter({ sx, layoutQuery = 'md', ...other }) {
  return (
    <FooterRoot sx={sx} {...other}>
      <Divider />

      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 5, [layoutQuery]: 8 } }}>
          {/* Header Section */}
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1.1rem',
            }}
          >
            <Iconify icon="solar:book-bold-duotone" width={28} height={28} />
            HSI News Portal
          </Box>

          {/* Footer Grid Content */}
          <FooterContent sx={{ mb: 4 }}>
            {/* About Section */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                Tentang Kami
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                HSI News Portal adalah platform informasi dan berita resmi dari HSI Boarding School
                untuk seluruh komunitas sekolah.
              </Typography>
            </Box>

            {/* Quick Links Section */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                Menu
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { label: 'Beranda', href: '/' },
                  { label: 'Berita', href: '/posts?category=berita' },
                  { label: 'Artikel', href: '/posts?category=artikel' },
                  { label: 'Pengumuman', href: '/posts?category=pengumuman' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    component={RouterLink}
                    href={link.href}
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        pl: 0.5,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Box>

            {/* Contact Section */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                Kontak
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  HSI Boarding School
                </Typography>
                <Link
                  href="mailto:info@hsi.sch.id"
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  info@hsi.sch.id
                </Link>
                <Link
                  href="tel:+62123456789"
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  +62 (123) 456-789
                </Link>
              </Box>
            </Box>
          </FooterContent>

          <Divider sx={{ my: 3 }} />

          {/* Copyright Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', [layoutQuery]: 'space-between' },
              alignItems: 'center',
              flexDirection: { xs: 'column', [layoutQuery]: 'row' },
              gap: 2,
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              © 2024 HSI Boarding School. All rights reserved.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: 'socials:twitter', href: '#' },
                { icon: 'socials:facebook', href: '#' },
                { icon: 'socials:instagram', href: '#' },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 167, 111, 0.08)',
                    color: 'primary.main',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: '#fff',
                    },
                  }}
                >
                  <Iconify icon={social.icon} width={18} />
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </FooterRoot>
  );
}
