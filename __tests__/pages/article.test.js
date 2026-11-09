import { describe, it, expect, vi } from 'vitest';

import ArticlePage from 'pages/article';

vi.mock('routes', () => ({
  ROUTES_NAMES: { article: 'article' },
  Link: ({ children }) => children,
}));

describe('pages/article', () => {
  // _app reads `Component.getLayoutProps`; a differently named static is silently ignored
  it('exposes getLayoutProps with the articles title', () => {
    expect(ArticlePage.getLayoutProps).toBeTypeOf('function');
    expect(ArticlePage.getLayoutProps({})).toEqual({ title: 'header.articles' });
  });
});
