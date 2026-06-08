import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// -----------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  blog: icon('ic-blog'),
  user: icon('ic-user'),
  dashboard: icon('ic-dashboard'),
};

// -----------------------------------------------

/**
 * HSI News Portal Navigation Configuration
 * Simplified menu for HSI boarding school news portal
 * Only essential items for article management
 */
export const navDataHSI = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'Overview', path: paths.dashboard.root, icon: ICONS.dashboard },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Manajemen Konten',
    items: [
      {
        title: 'Artikel',
        path: paths.dashboard.post.root,
        icon: ICONS.blog,
        children: [
          { title: 'Semua Artikel', path: paths.dashboard.post.root },
          { title: 'Tulis Baru', path: paths.dashboard.post.new },
        ],
      },
      {
        title: 'Profil',
        path: paths.dashboard.user.account,
        icon: ICONS.user,
      },
    ],
  },
];
