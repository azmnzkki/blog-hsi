'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { POSTS, _postsByCategory, POST_SORT_OPTIONS } from 'src/_mock';

import { PostItem } from '../post-item';
import { PostSearch } from '../post-search';
import { PostSort } from '../post-sort';

// ----------------------------------------------------------------------

export function PublicPostsListView() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';

  const { posts, displayTitle } = useMemo(() => {
    let filtered = POSTS;

    // Filter by category if specified
    if (category && category !== 'all') {
      filtered = _postsByCategory(category);
    }

    // Sort by latest
    filtered = [...filtered].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const titles = {
      all: 'Semua Artikel & Berita',
      berita: 'Berita Terkini',
      artikel: 'Artikel & Panduan',
      pengumuman: 'Pengumuman Penting',
    };

    return {
      posts: filtered,
      displayTitle: titles[category] || titles.all,
    };
  }, [category]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, md: 8 },
        minHeight: 'calc(100vh - 200px)',
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: 'text.primary',
          }}
        >
          {displayTitle}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: 600,
          }}
        >
          Temukan informasi terbaru, artikel menarik, dan pengumuman penting dari HSI Boarding School.
        </Typography>
      </Box>

      {/* Search and Sort Section */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: { xs: 3, md: 5 },
          alignItems: { sm: 'flex-end' },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <PostSearch redirectPath={(title) => `/posts/${title}`} />
        </Box>
        <Box>
          <PostSort sort="latest" sortOptions={POST_SORT_OPTIONS} />
        </Box>
      </Stack>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {posts.map((post) => (
            <Grid key={post.id} item xs={12} sm={6} md={4}>
              <PostItem
                post={post}
                onOpenPost={() => {
                  // Handle navigation to post details if needed
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Tidak ada artikel ditemukan
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Silakan coba kategori lain atau kembali ke halaman beranda.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
