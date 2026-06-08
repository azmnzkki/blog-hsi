import { CONFIG } from 'src/global-config';
import { POSTS } from 'src/_mock/_blog';

// -----------------------------------------------

export const metadata = { title: `Detail Artikel | Dashboard - ${CONFIG.appName}` };

export default function Page({ params }) {
  const { id } = params;
  const post = POSTS.find((p) => p.id === id);

  return (
    <div>
      <h1>{post?.title || 'Artikel tidak ditemukan'}</h1>
      <p>{post?.excerpt}</p>
    </div>
  );
}
