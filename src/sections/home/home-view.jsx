'use client';

import Box from '@mui/material/Box';

import { HomeHero } from './hero';
import { HomeLatestPosts } from './latest-posts';

// -----------------------------------------------

/**
 * Home View - Public page showing latest articles
 * Clean layout: Hero (intro) + Latest articles grid
 */
export function HomeView() {
  return (
    <Box sx={{ bgcolor: '#fff' }}>
      {/* Hero Section */}
      <HomeHero />

      {/* Latest Articles Section */}
      <HomeLatestPosts />
    </Box>
  );
}
