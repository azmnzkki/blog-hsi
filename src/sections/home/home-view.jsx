'use client';

import { HomeHero } from './hero';
import { HomeLatestPosts } from './latest-posts';
import { HomeAnnouncements } from './announcements';

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <>
      <HomeHero />
      <HomeLatestPosts />
      <HomeAnnouncements />
    </>
  );
}
