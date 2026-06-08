import { CONFIG } from 'src/global-config';

import { PublicLayout } from 'src/layouts/public';
import { PostListView } from 'src/sections/posts/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: `Semua Artikel & Berita | ${CONFIG.appName}`,
  description: 'Jelajahi semua artikel, berita, dan pengumuman dari HSI Boarding School',
};

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <PublicLayout>
      <PostListView />
    </PublicLayout>
  );
}
