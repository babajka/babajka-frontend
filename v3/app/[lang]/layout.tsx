import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { notFound } from 'next/navigation';
import { lang as rootLang } from 'next/root-params';

import { isLang, VALID_LOCALES } from '@/constants';
import { I18nProvider } from '@/lib/i18n/client';
import { getMessages } from '@/lib/i18n/dict';

import '../globals.css';

// Self-hosted by next/font: no render-blocking Google Fonts @import (legacy styles/index.scss),
// and a size-adjusted fallback, so no layout shift. Weight 300 was loaded but never used.
const ubuntu = Ubuntu({
  weight: ['400', '700'],
  subsets: ['cyrillic', 'latin', 'latin-ext'],
  variable: '--font-ubuntu',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wir.by v3',
  robots: { index: false, follow: false },
};

// Prerender all locales. With Cache Components, `dynamicParams = false` isn't allowed, so an
// unknown locale is rejected below (proxy.ts already redirects paths without a valid locale).
export const generateStaticParams = () => VALID_LOCALES.map(lang => ({ lang }));

// Root layout (Phase 3 adds the CoreLayout chrome and the full metadata).
export default async function RootLayout({ children }: LayoutProps<'/[lang]'>) {
  const lang = await rootLang();
  if (!isLang(lang)) {
    notFound();
  }

  return (
    <html lang={lang} className={`${ubuntu.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <I18nProvider lang={lang} messages={getMessages(lang)}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
