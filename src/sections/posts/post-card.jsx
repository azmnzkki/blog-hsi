'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { Image } from 'src/components/image';

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

export function PostCard({ post, onClick }) {
  const categoryStyle = CATEGORY_STYLES[post.category] || CATEGORY_STYLES.berita;

  const formattedDate = post.publishedAt.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card
      component={RouterLink}
      href={`/posts/${post.slug}`}
      onClick={onClick}
      sx={{
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[8],
          transform: 'translateY(-4px)',
          '& .post-image': {
            transform: 'scale(1.08)',
          },
        },
      }}
    >
      {/* Image Container */}
      <Box
        className="post-image"
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

        {/* Category Chip */}
        <Chip
          label={categoryStyle.label}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: categoryStyle.color,
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
      </Box>

      {/* Content */}
      <Stack sx={{ p: 2, gap: 1, flex: 1 }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
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
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: 40,
            flex: 1,
          }}
        >
          {post.excerpt}
        </Typography>

        {/* Footer */}
        <Box sx={{ borderTop: '1px solid #e5e7eb', pt: 1, mt: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {formattedDate}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
