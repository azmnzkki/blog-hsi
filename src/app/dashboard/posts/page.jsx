import { CONFIG } from 'src/global-config';

import { PostManagementView } from 'src/sections/posts/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Manajemen Artikel | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <PostManagementView />;
}
