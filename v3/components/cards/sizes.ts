import type { Screen } from '@/components/ui/Picture';

// Legacy features/layout/cards/utils.js. `className` is spelled out because Tailwind only finds
// complete class names in the source. `sizes.test.ts` keeps it in sync with `sizes`.

export type ArticleCardSize = 'xxl' | 'xl' | 'l' | 'm' | 'square-m' | 'square-s';

type Context = { sizes: Record<Screen, ArticleCardSize>; className: string };

const sizes = (
  mobile: ArticleCardSize,
  touch: ArticleCardSize,
  tablet: ArticleCardSize,
  tabletLarge: ArticleCardSize,
  desktop: ArticleCardSize
) => ({ mobile, touch, tablet, 'tablet-large': tabletLarge, desktop });

export const ARTICLE_CARD_CONTEXTS = {
  featured: {
    sizes: sizes('square-s', 'm', 'l', 'xl', 'xxl'),
    className:
      'article-square-s touch:article-m tablet:article-l tablet-lg:article-xl desktop:article-xxl',
  },
  'two-in-row-first': {
    sizes: sizes('square-s', 'm', 'l', 'm', 'm'),
    className:
      'article-square-s touch:article-m tablet:article-l tablet-lg:article-m desktop:article-m',
  },
  'two-in-row-second': {
    sizes: sizes('square-s', 'm', 'l', 'square-s', 'm'),
    className:
      'article-square-s touch:article-m tablet:article-l tablet-lg:article-square-s desktop:article-m',
  },
  'articles-by-tag-2': {
    sizes: sizes('square-s', 'm', 'square-m', 'l', 'square-m'),
    className:
      'article-square-s touch:article-m tablet:article-square-m tablet-lg:article-l desktop:article-square-m',
  },
  'articles-by-tag-3': {
    sizes: sizes('square-s', 'm', 'square-s', 'square-m', 'square-s'),
    className:
      'article-square-s touch:article-m tablet:article-square-s tablet-lg:article-square-m desktop:article-square-s',
  },
  'block-b-large': {
    sizes: sizes('square-s', 'm', 'l', 'm', 'l'),
    className:
      'article-square-s touch:article-m tablet:article-l tablet-lg:article-m desktop:article-l',
  },
  'block-b-small': {
    sizes: sizes('square-s', 'm', 'l', 'square-s', 'square-m'),
    className:
      'article-square-s touch:article-m tablet:article-l tablet-lg:article-square-s desktop:article-square-m',
  },
  'row-of-two': {
    sizes: sizes('square-s', 'm', 'l', 'square-m', 'm'),
    className:
      'article-square-s touch:article-m tablet:article-l tablet-lg:article-square-m desktop:article-m',
  },
  'row-of-three': {
    sizes: sizes('square-s', 'm', 'l', 'l', 'square-s'),
    className:
      'article-square-s touch:article-m tablet:article-l tablet-lg:article-l desktop:article-square-s',
  },
} satisfies Record<string, Context>;

export type ArticleCardContext = keyof typeof ARTICLE_CARD_CONTEXTS;

/** The large tag card is hidden below `tablet`. */
export const TAG_CARD_LARGE = 'tag-l tablet:tag-square-m desktop:tag-l';
export const TAG_CARD_SMALL =
  'tag-xs-wide touch:tag-ms tablet:tag-xs tablet-lg:tag-s-wide desktop:tag-s';
