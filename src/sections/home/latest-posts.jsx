'use client';

import { useState, useMemo } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { POSTS, _postsByCategory } from 'src/_mock';
import { Image } from 'src/components/image';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { PostGridSkeleton } from 'src/sections/posts/post-skeleton';
import { varFade } from 'src/components/animate/variants/fade';
import { varContainer } from 'src/components/animate/variants/container';

// -----------------------------------------------

const CATEGORY_COLORS = {
  berita: { bg: 'rgba(21, 101, 192, 0.1)', color: '#1565C0', label: 'Berita' },
  artikel: { bg: 'rgba(0, 167, 111, 0.1)', color: '#00A76F', label: 'Artikel' },
  pengumuman: { bg: 'rgba(255, 152, 0, 0.1)', color: '#FF9800', label: 'Pengumuman' },
};

// -----------------------------------------------

/**
 * Latest Posts Section - Clean grid layout like UGM
 * Shows featured post at top, then grid of 5 latest articles
 */
export function HomeLatestPosts() {
  const [isLoading, setIsLoading] = useState(false);

  // Get latest posts sorted by date
  const allPosts = useMemo(() => {
    return [...POSTS].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }, []);

  const featuredPost = allPosts[0];
  const gridPosts = allPosts.slice(1, 6);

  if (isLoading) {
    return <PostGridSkeleton count={6} />;
  }

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: '#fff' }}>
      <Container maxWidth="lg">
        {/* Section Title */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: 'text.primary',
            }}
          >
            Artikel Terbaru
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            Jelajahi artikel dan berita terkini dari HSI Boarding School
          </Typography>
        </Box>

        {/* Featured Post */}
        {featuredPost && (
          <Card
            component={RouterLink}
            href={`/posts/${featuredPost.slug}`}
            sx={{
              overflow: 'hidden',
              mb: 4,
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                boxShadow: (theme) => theme.shadows[8],
                transform: 'translateY(-4px)',
                '& .featured-image': {
                  transform: 'scale(1.05)',
                },
              },
            }}
          >
            <Grid container>
              {/* Featured Image */}
              <Grid item xs={12} md={5}>
                <Box
                  className="featured-image"
                  sx={{
                    position: 'relative',
                    height: { xs: 250, md: 320 },
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  <Image
                    alt={featuredPost.title}
                    src={featuredPost.coverUrl}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Box>
              </Grid>

              {/* Featured Content */}
              <Grid item xs={12} md={7}>
                <Stack sx={{ p: { xs: 3, md: 4 }, height: '100%', justifyContent: 'space-between' }}>
                  <Box>
                    {/* Category Badge */}
                    <Chip
                      label={CATEGORY_COLORS[featuredPost.category]?.label || 'Berita'}
                      size="small"
                      sx={{
                        backgroundColor: CATEGORY_COLORS[featuredPost.category]?.color,
                        color: '#fff',
                        fontWeight: 600,
                        mb: 2,
                      }}
                    />

                    {/* Title */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        lineHeight: 1.4,
                      }}
                    >
                      {featuredPost.title}
                    </Typography>

                    {/* Excerpt */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {featuredPost.excerpt}
                    </Typography>
                  </Box>

                  {/* Footer */}
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {featuredPost.publishedAt.toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                    <Button
                      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} />}
                      sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#00A76F' }}
                    >
                      Baca
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        )}

        {/* Posts Grid */}
        {gridPosts.length > 0 ? (
          <m.div
            initial="initial"
            animate="animate"
            variants={varContainer()}
          >
            <Grid container spacing={3}>
              {gridPosts.map((post, index) => (
                <Grid
                  key={post.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  component={m.div}
                  variants={varFade('inUp', { transitionIn: { delay: index * 0.1 } })}
                >
                  <Card
                    component={RouterLink}
                    href={`/posts/${post.slug}`}
                    sx={{
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      color: 'inherit',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        boxShadow: (theme) => theme.shadows[8],
                        transform: 'translateY(-4px)',
                        '& .grid-image': {
                          transform: 'scale(1.08)',
                        },
                      },
                    }}
                  >
                    {/* Image */}
                    <Box
                      className="grid-image"
                      sx={{
                        position: 'relative',
                        height: 200,
                        overflow: 'hidden',
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      <Image
                        alt={post.title}
                        src={post.coverUrl}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                      />

                      {/* Category Badge */}
                      <Chip
                        label={CATEGORY_COLORS[post.category]?.label || 'Berita'}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          backgroundColor: CATEGORY_COLORS[post.category]?.color,
                          color: '#fff',
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    {/* Content */}
                    <Stack sx={{ p: 2, flex: 1 }}>
                      {/* Title */}
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
                          minHeight: 52,
                          lineHeight: 1.3,
                        }}
                      >
                        {post.title}
                      </Typography>

                      {/* Excerpt */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          flex: 1,
                        }}
                      >
                        {post.excerpt}
                      </Typography>

                      {/* Footer */}
                      <Box sx={{ borderTop: '1px solid #e5e7eb', pt: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {post.publishedAt.toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </m.div>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Tidak ada artikel ditemukan
            </Typography>
          </Box>
        )}

        {/* View All Button */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={RouterLink}
            href="/posts"
            variant="contained"
            size="large"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            sx={{ backgroundColor: '#00A76F' }}
          >
            Lihat Semua Artikel
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
