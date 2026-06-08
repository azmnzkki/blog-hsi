import { CONFIG } from 'src/global-config';
import { PostNewEditForm } from 'src/sections/posts/post-new-edit-form';

// -----------------------------------------------

export const metadata = { title: `Tulis Artikel Baru | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <PostNewEditForm />;
}
