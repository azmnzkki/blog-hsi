import { CONFIG } from 'src/global-config';

import { JwtSignInView } from 'src/auth/view/jwt';

// -----------------------------------------------

export const metadata = { 
  title: `Masuk | HSI News Portal - ${CONFIG.appName}`,
  description: 'Masuk ke dashboard HSI News Portal untuk menulis artikel dan mengelola konten',
};

export default function Page() {
  return <JwtSignInView />;
}
