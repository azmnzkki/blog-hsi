import { CONFIG } from 'src/global-config';

import { PublicLayout } from 'src/layouts/public';
import { HomeView } from 'src/sections/home';

// -----------------------------------------------

export const metadata = {
  title: `Beranda | ${CONFIG.appName}`,
  description:
    'Portal Berita & Artikel HSI Boarding School - Temukan informasi terbaru, artikel inspiratif, dan pengumuman penting dari HSI Boarding School',
  keywords: [
    'HSI Boarding School',
    'Berita HSI',
    'Artikel HSI',
    'Pengumuman HSI',
    'News Portal',
  ],
  openGraph: {
    title: `Beranda | ${CONFIG.appName}`,
    description:
      'Portal Berita & Artikel HSI Boarding School - Temukan informasi terbaru dari komunitas kami',
    type: 'website',
    locale: 'id_ID',
  },
};

// -----------------------------------------------

export default function HomePage() {
  return (
    <PublicLayout>
      <HomeView />
    </PublicLayout>
  );
}
