'use client';

import { notFound } from 'next/navigation';

import { CONFIG } from 'src/global-config';

import { PublicLayout } from 'src/layouts/public';
import { PostDetailView } from 'src/sections/posts/view';

// -----------------------------------------------

export default function Page({ params }) {
  const { slug } = params;

  return (
    <PublicLayout>
      <PostDetailView slug={slug} />
    </PublicLayout>
  );
}
