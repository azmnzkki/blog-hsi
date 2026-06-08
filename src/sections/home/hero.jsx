'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function HomeHero() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.darker} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'common.white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack spacing={3} sx={{ maxWidth: 640 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify icon="solar:book-bold-duotone" width={20} />
            <Typography variant="overline" sx={{ opacity: 0.8, letterSpacing: 2 }}>
              HSI Boarding School
            </Typography>
          </Stack>

          <Typography
            variant="h2"
            sx={{ fontWeight: 800, lineHeight: 1.2, color: 'common.white' }}
          >
            Portal Berita &{' '}
            <Box component="span" sx={{ opacity: 0.85 }}>
              Artikel
            </Box>
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.85, maxWidth: 480, lineHeight: 1.8 }}>
            Informasi terbaru, artikel berkualitas, dan pengumuman penting dari komunitas HSI
            Boarding School.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
            <Button
              component={RouterLink}
              href="/posts"
              variant="contained"
              size="large"
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              sx={{
                bgcolor: 'common.white',
                color: 'primary.dark',
                fontWeight: 700,
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Lihat Semua Artikel
            </Button>

            <Button
              component={RouterLink}
              href="/posts?category=pengumuman"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: 'common.white',
                '&:hover': {
                  borderColor: 'common.white',
                  bgcolor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              Pengumuman
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
