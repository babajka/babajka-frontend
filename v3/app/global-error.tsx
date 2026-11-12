'use client';

import { useEffect } from 'react';

import './globals.css';

/**
 * Last resort: an error in the root layout itself, where neither the chrome nor the dictionary is
 * available. Replaces the whole document, so it renders its own <html>. Static trilingual text.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="be">
      <body className="bg-white p-12 font-sans">
        <h1 className="text-[2.5rem]">
          <span className="font-bold text-primary-dark">500</span> Унутраная памылка
        </h1>
        <p className="my-8 text-xl">Внутренняя ошибка · Internal error</p>
        <p>
          {/* A full reload on purpose: the app itself failed, so don't client-navigate. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="link" href="/">
            Wir.by
          </a>
        </p>
      </body>
    </html>
  );
}
