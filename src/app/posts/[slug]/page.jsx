import { CONFIG } from 'src/global-config';

import { PublicLayout } from 'src/layouts/public';
import { PostDetailView } from 'src/sections/posts/view';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  return {
    title: `Artikel | ${CONFIG.appName}`,
  };
}

// ----------------------------------------------------------------------

export default function Page({ params }) {
  return (
    <PublicLayout>
      <PostDetailView slug={params.slug} />
    </PublicLayout>
  );
}
