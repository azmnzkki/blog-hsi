'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// Simplified hero - akan dikombinasi dengan featured section
export function HomeHero() {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: 'text.primary',
          }}
        >
          Portal Berita & Artikel
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: 600,
          }}
        >
          Informasi terbaru, artikel berkualitas, dan pengumuman penting dari HSI Boarding School
        </Typography>
      </Container>
    </Box>
  );
}
