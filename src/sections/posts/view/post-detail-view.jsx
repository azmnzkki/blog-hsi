'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import Iconify from 'src/components/iconify';
import { Image } from 'src/components/image';
import { EmptyContent } from 'src/components/empty-content';
import { _postBySlug, _postsByCategory } from 'src/_mock/_blog';

// -----------------------------------------------

const CATEGORY_STYLES = {
  berita: {
    bg: 'rgba(21, 101, 192, 0.1)',
    color: '#1565C0',
    label: 'Berita',
  },
  artikel: {
    bg: 'rgba(0, 167, 111, 0.1)',
    color: '#00A76F',
    label: 'Artikel',
  },
  pengumuman: {
    bg: 'rgba(255, 152, 0, 0.1)',
    color: '#FF9800',
    label: 'Pengumuman',
  },
};

// -----------------------------------------------

export function PostDetailView({ slug }) {
  const post = _postBySlug(slug);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return _postsByCategory(post.category)
      .filter((p) => p.id !== post.id)
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <EmptyContent
          filled
          title="Artikel tidak ditemukan"
          description="Maaf, artikel yang Anda cari tidak ada atau telah dihapus. Silakan kembali ke daftar artikel atau cari artikel lainnya."
          action={
            <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
              <Button
                component="a"
                href="/posts"
                variant="contained"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
              >
                Kembali ke Semua Artikel
              </Button>
              <Button
                component="a"
                href="/"
                variant="outlined"
                startIcon={<Iconify icon="eva:home-fill" />}
              >
                Kembali ke Beranda
              </Button>
            </Stack>
          }
          sx={{ py: 10 }}
        />
      </Container>
    );
  }

  const categoryStyle = CATEGORY_STYLES[post.category] || CATEGORY_STYLES.berita;

  const formattedDate = post.publishedAt.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = post.publishedAt.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Estimasi waktu baca: ~200 words per minute
  const wordCount = post.content.split(' ').length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <>
      {/* Breadcrumb */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Breadcrumbs
          separator="›"
          sx={{
            '& .MuiBreadcrumbs-separator': {
              mx: 1,
              color: 'text.secondary',
            },
          }}
        >
          <Link href="/" underline="hover" sx={{ cursor: 'pointer', color: 'primary.main' }}>
            Beranda
          </Link>
          <Link href="/posts" underline="hover" sx={{ cursor: 'pointer', color: 'primary.main' }}>
            {categoryStyle.label}
          </Link>
          <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
            {post.title.length > 50 ? `${post.title.substring(0, 50)}...` : post.title}
          </Typography>
        </Breadcrumbs>
      </Container>

      {/* Cover Image - Full Width */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 250, sm: 350, md: 450 },
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
          }}
        />
      </Box>

      {/* Hero/Header Article */}
      <Container maxWidth="lg" sx={{ py: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Category & Meta Info */}
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={categoryStyle.label}
                    sx={{
                      backgroundColor: categoryStyle.color,
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {formattedDate}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    •
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    ⏱️ {readTime} min baca
                  </Typography>
                </Box>

                {/* Title (H1) */}
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.3,
                    color: 'text.primary',
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                  }}
                >
                  {post.title}
                </Typography>

                {/* Author Info - Inline */}
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    alignItems: 'center',
                    pt: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Avatar
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {post.author.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {post.author.role}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', ml: 'auto' }}>
                    {formattedTime}
                  </Typography>
                </Stack>
              </Stack>

              {/* Article Content */}
              <Box
                sx={{
                  '& p': {
                    mb: 2,
                    lineHeight: 1.85,
                    fontSize: '1.05rem',
                    color: 'text.primary',
                  },
                  '& h3': {
                    mt: 3.5,
                    mb: 1.5,
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: 'text.primary',
                  },
                  '& h4': {
                    mt: 2.5,
                    mb: 1,
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: 'text.primary',
                  },
                  '& ul': {
                    mb: 2,
                    pl: 3,
                    '& li': {
                      mb: 0.8,
                      lineHeight: 1.85,
                      color: 'text.primary',
                    },
                  },
                  '& blockquote': {
                    borderLeft: '4px solid',
                    borderColor: categoryStyle.color,
                    pl: 2.5,
                    py: 1.5,
                    my: 2.5,
                    backgroundColor: categoryStyle.bg,
                    fontStyle: 'italic',
                    color: 'text.secondary',
                    borderRadius: '0 4px 4px 0',
                  },
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Tag:
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {post.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: categoryStyle.color,
                          color: categoryStyle.color,
                          '&:hover': {
                            backgroundColor: categoryStyle.bg,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Grid>

          {/* Sidebar (Desktop) / Section (Mobile) */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Author Full Info Sidebar */}
              <Card
                sx={{
                  p: 2.5,
                  backgroundColor: 'action.hover',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'sticky',
                  top: 20,
                }}
              >
                <Stack spacing={2} sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    sx={{ width: 80, height: 80, mx: 'auto' }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {post.author.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                      {post.author.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        minHeight: 60,
                      }}
                    >
                      Pendidik profesional di HSI Boarding School dengan pengalaman mengajar lebih dari
                      5 tahun. Berdedikasi untuk mengembangkan karakter dan kompetensi generasi muda.
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Iconify icon="eva:external-link-fill" />}
                  >
                    Lihat Profil
                  </Button>
                </Stack>
              </Card>

              {/* Related Posts Section */}
              {relatedPosts.length > 0 && (
                <Card
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Artikel Terkait
                  </Typography>
                  <Stack spacing={2}>
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/posts/${relatedPost.slug}`}
                        sx={{
                          textDecoration: 'none',
                          cursor: 'pointer',
                          p: 1.5,
                          borderRadius: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                            '& .related-title': {
                              color: 'primary.main',
                            },
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          className="related-title"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            lineHeight: 1.4,
                            mb: 0.5,
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {relatedPost.title.length > 45
                            ? `${relatedPost.title.substring(0, 45)}...`
                            : relatedPost.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {relatedPost.publishedAt.toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Typography>
                      </Link>
                    ))}
                  </Stack>
                </Card>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Back Button */}
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Button
          component="a"
          href="/posts"
          variant="outlined"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Kembali ke Semua Artikel
        </Button>
      </Container>
    </>
  );
}
