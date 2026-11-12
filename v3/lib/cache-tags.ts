// Cache tags of the loaders in lib/loaders.ts. The backend can revalidate them on publish via
// POST /revalidate (app/revalidate/route.ts).

export const CACHE_TAGS = {
  /** Everything that lists or shows articles: the main page, listings, collections, diary. */
  articles: 'articles',
  article: (slug: string) => `article:${slug}`,
  mainPage: 'main-page',
  sidebar: 'sidebar',
  topic: (topic: string) => `topic:${topic}`,
  tag: (tag: string) => `tag:${tag}`,
  collection: (slug: string) => `collection:${slug}`,
  diary: 'diary',
} as const;
