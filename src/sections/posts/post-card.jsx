'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { RouterLink } from 'src/routes/components';
import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';
import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const CATEGORY_MAP = {
  berita: { label: 'Berita', color: 'info' },
  artikel: { label: 'Artikel', color: 'success' },
  pengumuman: { label: 'Pengumuman', color: 'warning' },
};

// ----------------------------------------------------------------------

export function PostCard({ post }) {
  const cat = CATEGORY_MAP[post.category] || CATEGORY_MAP.berita;

  return (
    <Card
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: (theme) => theme.shadows[8] },
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Image alt={post.title} src={post.coverUrl} ratio="16/9" />
        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <Label color={cat.color} variant="filled">
            {cat.label}
          </Label>
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, p: 2.5 }}>
        <Link
          component={RouterLink}
          href={`/posts/${post.slug}`}
          color="inherit"
          underline="hover"
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
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
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </Typography>

        {/* Footer */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ pt: 1.5, borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}
        >
          <Avatar
            src={post.author?.avatarUrl}
            alt={post.author?.name}
            sx={{ width: 28, height: 28 }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary', flex: 1 }} noWrap>
            {post.author?.name}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0 }}>
            <Iconify icon="solar:eye-bold" width={14} sx={{ color: 'text.disabled' }} />
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {fShortenNumber(post.totalViews)}
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.7rem' }}>
          {fDate(post.publishedAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}
