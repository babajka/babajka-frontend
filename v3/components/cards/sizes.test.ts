import { describe, expect, it } from 'vitest';

import { ARTICLE_CARD_CONTEXTS } from './sizes';

describe('ARTICLE_CARD_CONTEXTS', () => {
  it.each(Object.entries(ARTICLE_CARD_CONTEXTS))('%s: classes match sizes', (_, context) => {
    const { mobile, touch, tablet, 'tablet-large': tabletLarge, desktop } = context.sizes;
    expect(context.className).toBe(
      `article-${mobile} touch:article-${touch} tablet:article-${tablet} ` +
        `tablet-lg:article-${tabletLarge} desktop:article-${desktop}`
    );
  });
});
