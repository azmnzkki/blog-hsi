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
import { Label } from 'src/components/label';
import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

const CATEGORY_MAP = {
  berita: { label: 'Berita', color: 'info' },
  artikel: { label: 'Artikel', color: 'success' },
  pengumuman: { label: 'Pengumuman', color: 'warning' },
};

// ----------------------------------------------------------------------

export function HomePostCard({ post }) {
  const cat = CATEGORY_MAP[post.category] || CATEGORY_MAP.berita;

  return (
    <Card
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[8],
          transition: 'box-shadow 0.3s',
        },
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
      <CardContent
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, p: 2.5 }}
      >
        <Link
          component={RouterLink}
          href={`/posts/${post.slug}`}
          color="inherit"
          underline="hover"
          sx={{ flex: 1 }}
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
          spacing={1}
          alignItems="center"
          sx={{ pt: 1.5, borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}
        >
          <Avatar
            src={post.author?.avatarUrl}
            alt={post.author?.name}
            sx={{ width: 28, height: 28 }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {post.author?.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="caption" sx={{ color: 'text.disabled', flexShrink: 0 }}>
            {fDate(post.publishedAt)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
