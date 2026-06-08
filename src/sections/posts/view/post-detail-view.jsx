'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { RouterLink } from 'src/routes/components';
import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';
import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { _postBySlug, _postsByCategory } from 'src/_mock/_blog';

// ----------------------------------------------------------------------

const CATEGORY_MAP = {
  berita: { label: 'Berita', color: 'info' },
  artikel: { label: 'Artikel', color: 'success' },
  pengumuman: { label: 'Pengumuman', color: 'warning' },
};

// ----------------------------------------------------------------------

export function PostDetailView({ slug }) {
  const post = _postBySlug(slug);
  const cat = CATEGORY_MAP[post?.category] || CATEGORY_MAP.berita;

  const related = post
    ? _postsByCategory(post.category)
        .filter((p) => p.id !== post.id && p.status === 'published')
        .slice(0, 3)
    : [];

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Artikel tidak ditemukan
        </Typography>
        <Link component={RouterLink} href="/" variant="body1">
          Kembali ke Beranda
        </Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link component={RouterLink} href="/" color="inherit" underline="hover">
          Beranda
        </Link>
        <Link component={RouterLink} href="/posts" color="inherit" underline="hover">
          Artikel
        </Link>
        <Typography color="text.primary" noWrap sx={{ maxWidth: 240 }}>
          {post.title}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={5}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Category & Title */}
          <Label color={cat.color} variant="soft" sx={{ mb: 2 }}>
            {cat.label}
          </Label>

          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.3, mb: 3 }}>
            {post.title}
          </Typography>

          {/* Author & Meta */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Avatar
              src={post.author?.avatarUrl}
              alt={post.author?.name}
              sx={{ width: 44, height: 44 }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2">{post.author?.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {post.author?.role} · {fDate(post.publishedAt)}
              </Typography>
            </Box>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Iconify icon="solar:eye-bold" width={16} sx={{ color: 'text.disabled' }} />
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {fShortenNumber(post.totalViews)} views
              </Typography>
            </Stack>
          </Stack>

          {/* Cover Image */}
          <Box sx={{ mb: 5, borderRadius: 2, overflow: 'hidden' }}>
            <Image alt={post.title} src={post.coverUrl} ratio="16/9" />
          </Box>

          {/* Content */}
          <Box
            dangerouslySetInnerHTML={{ __html: post.content }}
            sx={{
              '& h1, & h2, & h3, & h4': { fontWeight: 700, mt: 4, mb: 1.5 },
              '& p': { lineHeight: 1.9, mb: 2, color: 'text.secondary' },
              '& ul, & ol': { pl: 3, mb: 2 },
              '& li': { mb: 0.5, lineHeight: 1.8, color: 'text.secondary' },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                pl: 2,
                ml: 0,
                my: 3,
                color: 'text.secondary',
                fontStyle: 'italic',
              },
              '& img': { maxWidth: 1, borderRadius: 1.5, my: 2 },
              '& a': { color: 'primary.main' },
              '& code': {
                bgcolor: 'action.hover',
                px: 0.75,
                py: 0.25,
                borderRadius: 0.5,
                fontSize: '0.875em',
              },
            }}
          />

          {/* Tags */}
          {post.tags?.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 4, gap: 1 }}>
              {post.tags.map((tag) => (
                <Label key={tag} variant="soft" color="default">
                  #{tag}
                </Label>
              ))}
            </Stack>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Author Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Tentang Penulis
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={post.author?.avatarUrl}
                  alt={post.author?.name}
                  sx={{ width: 56, height: 56 }}
                />
                <Box>
                  <Typography variant="subtitle2">{post.author?.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {post.author?.role}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {related.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                  Artikel Terkait
                </Typography>
                <Stack spacing={2} divider={<Divider />}>
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      component={RouterLink}
                      href={`/posts/${rel.slug}`}
                      color="inherit"
                      underline="hover"
                    >
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            flexShrink: 0,
                            borderRadius: 1,
                            overflow: 'hidden',
                          }}
                        >
                          <Image
                            alt={rel.title}
                            src={rel.coverUrl}
                            sx={{ width: 1, height: 1, objectFit: 'cover' }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.4,
                            }}
                          >
                            {rel.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: 'text.disabled', display: 'block', mt: 0.5 }}
                          >
                            {fDate(rel.publishedAt)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Link>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
