'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';

import { POSTS, _postsByCategory } from 'src/_mock';

import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

// -----------------------------------------------

export function HomeAnnouncements() {
  const announcements = useMemo(() => {
    const pengumuman = _postsByCategory('pengumuman');
    return pengumuman
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3);
  }, []);

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Iconify icon="solar:megaphone-v2-bold-duotone" width={32} sx={{ color: 'primary.main' }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
              }}
            >
              Pengumuman Penting
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
            }}
          >
            Informasi penting dan terbaru yang perlu Anda ketahui tentang HSI Boarding School
          </Typography>
        </Box>

        {/* Announcements List */}
        {announcements.length > 0 ? (
          <Stack spacing={2}>
            {announcements.map((announcement, index) => (
              <AnnouncementItem
                key={announcement.id}
                announcement={announcement}
                isLatest={index === 0}
              />
            ))}
          </Stack>
        ) : (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: '#f9fafb',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Tidak ada pengumuman saat ini
            </Typography>
          </Paper>
        )}

        {/* View All Link */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Link
            component={RouterLink}
            href="/posts?category=pengumuman"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 600,
              color: 'primary.main',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                gap: 1.5,
              },
            }}
          >
            Lihat Semua Pengumuman
            <Iconify icon="solar:arrow-right-bold-duotone" width={20} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

// -----------------------------------------------

function AnnouncementItem({ announcement, isLatest = false }) {
  const formattedDate = announcement.publishedAt.toLocaleDateString('id-ID', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const daysAgo = Math.floor(
    (new Date() - new Date(announcement.publishedAt)) / (1000 * 60 * 60 * 24)
  );

  return (
    <Paper
      component={RouterLink}
      href={`/posts/${announcement.slug}`}
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s ease',
        backgroundColor: isLatest ? 'rgba(0, 167, 111, 0.02)' : '#fff',
        border: '1px solid',
        borderColor: isLatest ? 'primary.lighter' : 'divider',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[4],
          borderColor: 'primary.main',
          backgroundColor: isLatest ? 'rgba(0, 167, 111, 0.04)' : 'rgba(0, 167, 111, 0.02)',
        },
      }}
    >
      {/* Content */}
      <Stack sx={{ gap: 1.5, flex: 1 }}>
        {/* Title & Badge */}
        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {announcement.title}
            </Typography>
          </Box>
          {isLatest && (
            <Chip
              icon={<Iconify icon="solar:star-bold-duotone" width={16} />}
              label="Terbaru"
              size="small"
              sx={{
                backgroundColor: 'error.lighter',
                color: 'error.main',
                fontWeight: 600,
                flexShrink: 0,
              }}
            />
          )}
        </Stack>

        {/* Excerpt */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {announcement.excerpt}
        </Typography>

        {/* Meta Info */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            alignItems: { xs: 'flex-start', sm: 'center' },
            pt: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Diposting oleh <strong>{announcement.author.name}</strong>
          </Typography>
          <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'divider', display: { xs: 'none', sm: 'block' } }} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {formattedDate}
            {daysAgo > 0 && ` (${daysAgo} hari lalu)`}
          </Typography>
        </Stack>
      </Stack>

      {/* Arrow Icon */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 167, 111, 0.1)',
          color: 'primary.main',
          transition: 'all 0.3s ease',
          flexShrink: 0,
          alignSelf: { xs: 'flex-end', sm: 'center' },
        }}
      >
        <Iconify icon="solar:arrow-right-bold-duotone" width={20} />
      </Box>
    </Paper>
  );
}
