'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

// -----------------------------------------------

/**
 * Post Card Skeleton for loading state
 * Mimics PostCard component structure
 */
export function PostCardSkeleton({ sx }) {
  return (
    <Card
      sx={[
        {
          overflow: 'hidden',
          borderRadius: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Image Skeleton */}
      <Box sx={{ pt: '100%', position: 'relative', overflow: 'hidden' }}>
        <Skeleton variant="rectangular" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      </Box>

      {/* Content Skeleton */}
      <Stack sx={{ p: 2.5, gap: 1.5 }}>
        <Skeleton variant="text" sx={{ height: 30 }} />
        <Skeleton variant="text" sx={{ height: 20 }} />
        <Skeleton variant="text" sx={{ height: 20, width: 0.8 }} />
        <Skeleton variant="text" sx={{ height: 20, width: 0.6 }} />
      </Stack>
    </Card>
  );
}

// -----------------------------------------------

/**
 * Post Grid Skeleton - displays multiple post card skeletons
 * Used for loading state on pages with grid layout
 */
export function PostGridSkeleton({ count = 12, sx }) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }, (_, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <PostCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

// -----------------------------------------------

/**
 * Post List Card Skeleton for mobile/compact views
 * Mimics the mobile card list structure
 */
export function PostListCardSkeleton({ sx }) {
  return (
    <Card sx={[{ p: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Stack spacing={2}>
        {/* Cover + Title */}
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rounded" sx={{ width: 60, height: 60, flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" sx={{ height: 20, mb: 0.5 }} />
            <Skeleton variant="text" sx={{ height: 16, width: 0.9 }} />
          </Box>
        </Stack>

        {/* Chips */}
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Skeleton variant="rounded" sx={{ width: 60, height: 24 }} />
          <Skeleton variant="rounded" sx={{ width: 80, height: 24 }} />
        </Stack>

        {/* Footer */}
        <Stack direction="row" spacing={1} sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.5 }}>
          <Skeleton variant="text" sx={{ height: 14, width: 0.5 }} />
          <Box sx={{ flex: 1 }} />
          <Skeleton variant="circular" sx={{ width: 32, height: 32 }} />
        </Stack>
      </Stack>
    </Card>
  );
}

// -----------------------------------------------

/**
 * Post List Card Skeletons - displays multiple list card skeletons
 * Used for loading state on management page
 */
export function PostListCardSkeletons({ count = 5, sx }) {
  return (
    <Stack spacing={2} sx={sx}>
      {Array.from({ length: count }, (_, index) => (
        <PostListCardSkeleton key={index} />
      ))}
    </Stack>
  );
}

// -----------------------------------------------

/**
 * Post Form Skeleton - shows skeleton for form fields
 * Used when loading post data for editing
 */
export function PostFormSkeleton({ sx }) {
  return (
    <Box sx={sx}>
      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Title Card */}
            <Card sx={{ p: 3 }}>
              <Skeleton variant="text" sx={{ height: 24, mb: 2 }} />
              <Skeleton variant="rectangular" sx={{ height: 120 }} />
            </Card>

            {/* Category Card */}
            <Card sx={{ p: 3 }}>
              <Skeleton variant="text" sx={{ height: 24, mb: 2 }} />
              <Skeleton variant="rectangular" sx={{ height: 40 }} />
            </Card>

            {/* Tags Card */}
            <Card sx={{ p: 3 }}>
              <Skeleton variant="text" sx={{ height: 24, mb: 2 }} />
              <Skeleton variant="rectangular" sx={{ height: 40, mb: 2 }} />
              <Stack direction="row" spacing={1}>
                <Skeleton variant="rounded" sx={{ width: 60, height: 24 }} />
                <Skeleton variant="rounded" sx={{ width: 60, height: 24 }} />
              </Stack>
            </Card>

            {/* Cover Card */}
            <Card sx={{ p: 3 }}>
              <Skeleton variant="text" sx={{ height: 24, mb: 2 }} />
              <Skeleton variant="rectangular" sx={{ height: 180 }} />
            </Card>

            {/* Actions Card */}
            <Card sx={{ p: 3 }}>
              <Skeleton variant="rectangular" sx={{ height: 40, mb: 2 }} />
              <Skeleton variant="rectangular" sx={{ height: 40, mb: 2 }} />
              <Skeleton variant="rectangular" sx={{ height: 40 }} />
            </Card>
          </Stack>
        </Grid>

        {/* Editor */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Skeleton variant="text" sx={{ height: 24, mb: 2 }} />
            <Skeleton variant="rectangular" sx={{ height: 500 }} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
