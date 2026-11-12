'use client';

import { useEffect, useState } from 'react';

import { ArrowAltCircleUpIcon } from '@/components/icons';
import { cn } from '@/lib/utils/cn';

// Same threshold as legacy `<ScrollToTop showUnder={160}>` (react-scroll-up).
const SHOW_UNDER = 160;

/** Scroll-to-top button, replacing react-scroll-up. */
const GoUp = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_UNDER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="↑"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => {
        const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
      }}
      className={cn(
        'fixed right-[30px] bottom-[50px] z-go-up link cursor-pointer text-5xl transition-opacity duration-200',
        visible ? 'visible opacity-100' : 'invisible opacity-0'
      )}
    >
      <ArrowAltCircleUpIcon />
    </button>
  );
};

export default GoUp;
