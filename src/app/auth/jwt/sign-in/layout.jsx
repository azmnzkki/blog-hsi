import { AuthSplitLayout } from 'src/layouts/auth-split';

import { GuestGuard } from 'src/auth/guard';

// -----------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <AuthSplitLayout
        slotProps={{
          section: { 
            title: 'Selamat Datang di HSI News Portal',
            description: 'Platform berita dan artikel untuk HSI Boarding School',
          },
        }}
      >
        {children}
      </AuthSplitLayout>
    </GuestGuard>
  );
}
