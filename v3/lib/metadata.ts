// Page metadata, replacing the legacy Meta* components (components/social/Metatags.js).
//
// Next merges metadata shallowly: a page that sets `openGraph` or `twitter` replaces the layout's
// whole object. So every page builds both through these helpers, and nothing gets lost.
import type { Metadata } from 'next';

import { LOCALE_CODE, type Lang } from '@/constants';
import { TWITTER_HANDLE } from '@/constants/social';
import { DEFAULT_IMAGE, SITE_URL } from '@/lib/site';

type SocialOptions = {
  lang: Lang;
  title: string;
  description: string;
  image?: string;
  /** Legacy `<MetaImage small />`: a small preview card instead of `summary_large_image`. */
  smallImage?: boolean;
  /** Page path with the locale, resolved against `metadataBase`, e.g. `/be/about`. */
  url?: string;
};

export const socialMetadata = ({
  lang,
  title,
  description,
  image = DEFAULT_IMAGE,
  smallImage = false,
  url,
}: SocialOptions): Pick<Metadata, 'openGraph' | 'twitter'> => ({
  openGraph: {
    type: 'website',
    siteName: 'Wir.by',
    title,
    description,
    images: image,
    locale: LOCALE_CODE[lang],
    url,
  },
  twitter: {
    card: smallImage ? 'summary' : 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title,
    description,
    images: image,
  },
});

type PageOptions = SocialOptions & {
  url: string;
  keywords?: string;
};

/** Metadata of a page. `title` goes without the suffix: the root layout adds ` | Wir.by`. */
export const pageMetadata = ({ keywords, ...social }: PageOptions): Metadata => ({
  title: social.title,
  description: social.description,
  ...(keywords && { keywords }),
  ...socialMetadata(social),
  // `other` is printed as is: unlike og:url, it isn't resolved against `metadataBase`.
  other: { 'twitter:url': new URL(social.url, SITE_URL).href },
});
