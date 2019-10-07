// This data must be in sync with article.scss file.

// TODO: to generate SCSS rules based on this file.

export const SCREENS = ['mobile', 'touch', 'tablet', 'tablet-large', 'desktop'];

// Each leaf array represents card sizes for [mobile, touch, tablet, tablet-large, dekstop] screen sizes respectively.

export const ARTICLE_CARD_SIZES_BY_CONTEXT = {
  featured: ['square-s', 'm', 'l', 'xl', 'xxl'],
  'two-in-row': {
    first: ['m', 'square-s', 'm', 'l', 'm'],
    second: ['square-s', 'square-s', 'm', 'l', 'm'],
  },
  'articles-by-tag-2': ['square-s', 'm', 'square-m', 'l', 'square-m'],
  'articles-by-tag-3': ['square-s', 'm', 'square-s', 'square-m', 'square-s'],
  'tag-page-block-b': {
    'large-card': ['square-s', 'm', 'l', 'm', 'l'],
    'small-card': ['square-s', 'm', 'l', 'square-s', 'square-m'],
  },
  'tag-page-block-cd': {
    'row-of-two': ['square-s', 'm', 'l', 'square-m', 'm'],
    'row-of-three': ['square-s', 'm', 'l', 'l', 'square-s'],
  },
};
