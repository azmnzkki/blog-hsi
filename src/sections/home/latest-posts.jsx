'use client';

import { useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { POSTS } from 'src/_mock/_blog';

import { HomePostCard } from './home-post-card';
import { HomeFeaturedPost } from './home-featured-post';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'all', label: 'Semua' },
  { value: 'berita', label: 'Berita' },
  { value: 'artikel', label: 'Artikel' },
  { value: 'pengumuman', label: 'Pengumuman' },
];

// ----------------------------------------------------------------------

export function HomeLatestPosts() {
  const [activeTab, setActiveTab] = useState('all');

  const publishedPosts = useMemo(
    () =>
      [...POSTS]
        .filter((p) => p.status === 'published')
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
    []
  );

  const filtered = useMemo(
    () =>
      activeTab === 'all' ? publishedPosts : publishedPosts.filter((p) => p.category === activeTab),
    [activeTab, publishedPosts]
  );

  const featuredPost = filtered[0];
  const gridPosts = filtered.slice(1, 7);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'flex-end' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              Artikel Terbaru
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Jelajahi informasi terkini dari HSI Boarding School
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            href="/posts"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            sx={{ flexShrink: 0 }}
          >
            Lihat Semua
          </Button>
        </Stack>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Belum ada artikel dalam kategori ini.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Box sx={{ mb: 4 }}>
                <HomeFeaturedPost post={featuredPost} />
              </Box>
            )}

            {/* Grid Posts */}
            {gridPosts.length > 0 && (
              <Grid container spacing={3}>
                {gridPosts.map((post) => (
                  <Grid key={post.id} item xs={12} sm={6} md={4}>
                    <HomePostCard post={post} />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
