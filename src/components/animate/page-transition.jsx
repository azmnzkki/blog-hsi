'use client';

import { m } from 'framer-motion';
import { varFade } from './variants/fade';

// -----------------------------------------------

/**
 * Page Transition Wrapper
 * Wraps page content to fade in when navigating
 */
export function PageTransition({ children }) {
  return (
    <m.div
      initial="initial"
      animate="animate"
      variants={varFade('in')}
      transition={{ duration: 0.5 }}
    >
      {children}
    </m.div>
  );
}
