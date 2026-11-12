import type { Metadata, Viewport } from 'next';
import { Ubuntu } from 'next/font/google';
import { notFound } from 'next/navigation';
import { LOCALE_CODE, VALID_LOCALES } from '@/constants';
import { DEFAULT_KEYWORDS, FACEBOOK_APP_ID, TWITTER_HANDLE } from '@/constants/social';
import { I18nProvider } from '@/lib/i18n/client';
import { getMessages } from '@/lib/i18n/dict';
import { getLang, getRootLang, getT } from '@/lib/i18n/server';
import {
  APPLE_TOUCH_ICON,
  DEFAULT_IMAGE,
  FAVICON_URL,
  IS_PROD,
  SITE_URL,
  THEME_COLOR,
} from '@/lib/site';

import '../globals.css';

// Self-hosted by next/font: no render-blocking Google Fonts @import (legacy styles/index.scss),
// and a size-adjusted fallback, so no layout shift. Weight 300 was loaded but never used.
const ubuntu = Ubuntu({
  weight: ['400', '700'],
  subsets: ['cyrillic', 'latin', 'latin-ext'],
  variable: '--font-ubuntu',
  display: 'swap',
});

/**
 * Site-wide metadata, replacing legacy components/social/Metatags.js + the head of pages/_app.js.
 * Pages override title, description, image and og:url (Phase 4).
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const lang = await getLang();
  const t = await getT(lang);
  const title = t('common.project-type');
  const description = t('common.project-description');

  return {
    metadataBase: new URL(SITE_URL),
    // legacy: `<title>{title} | Wir.by</title>`, and og/twitter titles without the suffix
    title: { default: `${title} | Wir.by`, template: '%s | Wir.by' },
    description,
    keywords: DEFAULT_KEYWORDS,
    // Only the real wir.by is indexed (legacy: `!process.env.isProd` → noindex).
    robots: IS_PROD ? undefined : { index: false, follow: false },
    icons: { icon: { url: FAVICON_URL, type: 'image/png' }, apple: APPLE_TOUCH_ICON },
    appleWebApp: { title: t('common.project-apple-title') },
    openGraph: {
      type: 'website',
      siteName: 'Wir.by',
      title,
      description,
      images: DEFAULT_IMAGE,
      locale: LOCALE_CODE[lang],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: DEFAULT_IMAGE,
    },
    facebook: { appId: FACEBOOK_APP_ID },
  };
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

// Prerender all locales. With Cache Components, `dynamicParams = false` isn't allowed, so an
// unknown locale is rejected below (proxy.ts already redirects paths without a valid locale).
export const generateStaticParams = () => VALID_LOCALES.map(lang => ({ lang }));

// Root layout: <html>, fonts, i18n. The page chrome is in the route groups:
// `(site)` (header, sidebar, footer) and `(game)` (no shared header).
export default async function RootLayout({ children }: LayoutProps<'/[lang]'>) {
  const lang = await getRootLang();
  if (!lang) {
    notFound();
  }

  return (
    <html lang={lang} className={`${ubuntu.variable} h-full antialiased`}>
      <body>
        <I18nProvider lang={lang} messages={getMessages(lang)}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
