import { CONFIG } from 'src/global-config';

import { DashboardHomeView } from 'src/sections/dashboard-home';

// -----------------------------------------------

export const metadata = {
  title: `Dashboard | ${CONFIG.appName}`,
  description: 'Halaman utama dashboard HSI News Portal',
};

export default function DashboardPage() {
  return <DashboardHomeView />;
}
