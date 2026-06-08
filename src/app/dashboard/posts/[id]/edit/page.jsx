import { CONFIG } from 'src/global-config';
import { PostNewEditForm } from 'src/sections/posts/post-new-edit-form';
import { POSTS } from 'src/_mock/_blog';

// -----------------------------------------------

export const metadata = { title: `Edit Artikel | Dashboard - ${CONFIG.appName}` };

export default function Page({ params }) {
  const { id } = params;
  
  // Get article from mock data
  const currentPost = POSTS.find((post) => post.id === id);

  if (!currentPost) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Artikel tidak ditemukan</h1>
      </div>
    );
  }

  return <PostNewEditForm currentPost={currentPost} />;
}
