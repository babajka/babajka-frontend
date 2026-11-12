'use client';

import { useEffect } from 'react';

import ErrorMessage from '@/components/layout/ErrorMessage';
import { useLang } from '@/lib/i18n/client';

/**
 * Errors while rendering a page: the 500 message inside the normal chrome (legacy redirected to
 * /status/500 from `catchServerSideErrors`).
 */
export default function PageError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorMessage code={500} lang={useLang()} />;
}
