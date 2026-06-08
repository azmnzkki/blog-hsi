'use client';

import { HomeHero } from './hero';
import { HomeLatestPosts } from './latest-posts';

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <>
      <HomeHero />
      <HomeLatestPosts />
    </>
  );
}
