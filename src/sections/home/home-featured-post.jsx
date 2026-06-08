'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { fDate } from 'src/utils/format-time';
import { Label } from 'src/components/label';
import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

const CATEGORY_MAP = {
  berita: { label: 'Berita', color: 'info' },
  artikel: { label: 'Artikel', color: 'success' },
  pengumuman: { label: 'Pengumuman', color: 'warning' },
};

// ----------------------------------------------------------------------

export function HomeFeaturedPost({ post }) {
  const cat = CATEGORY_MAP[post.category] || CATEGORY_MAP.berita;

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Grid container>
        {/* Image */}
        <Grid item xs={12} md={5}>
          <Box sx={{ height: { xs: 240, md: '100%' }, minHeight: { md: 320 } }}>
            <Image
              alt={post.title}
              src={post.coverUrl}
              sx={{ width: 1, height: 1, objectFit: 'cover' }}
            />
          </Box>
        </Grid>

        {/* Content */}
        <Grid item xs={12} md={7}>
          <Stack
            spacing={2}
            sx={{ p: { xs: 3, md: 4 }, height: 1, justifyContent: 'space-between' }}
          >
            <Box>
              <Label color={cat.color} variant="soft" sx={{ mb: 2 }}>
                {cat.label}
              </Label>

              <Link
                component={RouterLink}
                href={`/posts/${post.slug}`}
                color="inherit"
                underline="hover"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1.4,
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.title}
                </Typography>
              </Link>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {post.excerpt}
              </Typography>
            </Box>

            {/* Author */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                src={post.author?.avatarUrl}
                alt={post.author?.name}
                sx={{ width: 36, height: 36 }}
              />
              <Box>
                <Typography variant="subtitle2">{post.author?.name}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {post.author?.role} · {fDate(post.publishedAt)}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}
