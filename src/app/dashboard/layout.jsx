import { CONFIG } from 'src/global-config';
import { DashboardHSILayout } from 'src/layouts/dashboard-hsi';
import { MockAuthGuard } from 'src/auth/guard/mock-auth-guard';

// -----------------------------------------------

export default function Layout({ children }) {
  return (
    <MockAuthGuard>
      <DashboardHSILayout>{children}</DashboardHSILayout>
    </MockAuthGuard>
  );
}
