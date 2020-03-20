// This data must be in sync with articleCard.module.scss file.

// TODO: to generate SCSS rules based on this file.

export const SCREENS = ['mobile', 'touch', 'tablet', 'tablet-large', 'desktop'];

// Each leaf array represents card sizes for
// [mobile, touch, tablet, tablet-large, dekstop] screen sizes respectively.

// Paths in a dict below must be the same as blockContexts passed to ArticleCards.

export const ARTICLE_CARD_SIZES_BY_CONTEXT = {
  featured: ['square-s', 'm', 'l', 'xl', 'xxl'],
  'two-in-row': {
    'two-in-row__first': ['square-s', 'm', 'l', 'm', 'm'],
    'two-in-row__second': ['square-s', 'm', 'l', 'square-s', 'm'],
  },
  'articles-by-tag-2': ['square-s', 'm', 'square-m', 'l', 'square-m'],
  'articles-by-tag-3': ['square-s', 'm', 'square-s', 'square-m', 'square-s'],
  'tag-page-block-b': {
    'tag-page-block-b__large-card': ['square-s', 'm', 'l', 'm', 'l'],
    'tag-page-block-b__small-card': ['square-s', 'm', 'l', 'square-s', 'square-m'],
  },
  'tag-page-block-cd': {
    'tag-page-block-cd__row-of-two': ['square-s', 'm', 'l', 'square-m', 'm'],
    'tag-page-block-cd__row-of-three': ['square-s', 'm', 'l', 'l', 'square-s'],
  },
};
