import { describe, expect, it } from 'vitest';

import { DEFAULT_IMAGE, SITE_URL } from '@/lib/site';

import { pageMetadata, socialMetadata } from './metadata';

const base = { lang: 'ru', title: 'Title', description: 'Description' } as const;

describe('socialMetadata', () => {
  it('uses the default image and a large card', () => {
    const { openGraph, twitter } = socialMetadata(base);

    expect(openGraph).toMatchObject({ images: DEFAULT_IMAGE, locale: 'ru_RU', siteName: 'Wir.by' });
    expect(twitter).toMatchObject({ card: 'summary_large_image', images: DEFAULT_IMAGE });
  });

  it('switches to the small card', () => {
    expect(socialMetadata({ ...base, smallImage: true }).twitter).toMatchObject({
      card: 'summary',
    });
  });
});

describe('pageMetadata', () => {
  it('sets the page url on og:url and twitter:url', () => {
    const metadata = pageMetadata({ ...base, url: '/ru/about' });

    expect(metadata.openGraph).toMatchObject({ url: '/ru/about', title: 'Title' });
    expect(metadata.other).toEqual({ 'twitter:url': `${SITE_URL}/ru/about` });
  });

  it('keeps the layout keywords unless the page has its own', () => {
    expect(pageMetadata({ ...base, url: '/ru/about' })).not.toHaveProperty('keywords');
    expect(pageMetadata({ ...base, url: '/ru/about', keywords: 'a, b' }).keywords).toBe('a, b');
  });
});
