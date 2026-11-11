/**
 * Fixture URLs for legacy ↔ v3 parity checks (visual + ARIA snapshots).
 *
 * Slugs are real prod content (https://api-prod.wir.by), picked on 2026-11-09 by scanning all
 * 123 articles for the Fibery renderer features in `utils/fibery/` (greedy set cover).
 * Not present in prod content at that time: TABLE_RIGHT tables and Yandex Music playlist embeds.
 *
 * `path` is without the locale prefix; the harness expands it to `/${lang}${path}`.
 * The URL locale is the UI language; article content language is defined by the slug.
 */

export type Lang = 'be' | 'ru' | 'en';

export type Fixture = {
  name: string;
  path: string;
  langs: Lang[];
  /** what this fixture covers, for humans and for `--grep` */
  covers: string[];
  /** content that differs between loads or days; mask it or freeze it in the visual test */
  unstable?: string[];
};

const ALL: Lang[] = ['be', 'ru', 'en'];
const BE: Lang[] = ['be'];

export const FIXTURES: Fixture[] = [
  // layout + main page
  {
    name: 'main',
    path: '',
    langs: ALL,
    covers: ['card blocks', 'banner', 'diary block', 'header', 'sidebar', 'footer'],
    unstable: ['diary block (today)', 'header motto (random)', 'newest articles'],
  },
  { name: 'about', path: '/about', langs: ALL, covers: ['static page'] },

  // articles (one per Fibery feature group)
  {
    name: 'article-table-youtube',
    path: '/article/belkino1-ru',
    langs: ['ru', 'en'],
    covers: ['TABLE', 'YOUTUBE', 'IMAGE_RIGHT', 'QUOTE', 'LIST', 'collection note', 'ru content'],
    unstable: ['youtube iframe'],
  },
  {
    name: 'article-poem-split',
    path: '/article/kupala-kolas',
    langs: ALL,
    covers: ['POEM', 'SPLIT', 'IMAGE', 'other-locale header links'],
  },
  {
    name: 'article-audio-note',
    path: '/article/kashubskaya-mova',
    langs: BE,
    covers: ['audio article', 'NOTE', 'HEADING', 'QUOTE', 'podcast buttons', 'collection note'],
    unstable: ['audio player iframe'],
  },
  {
    name: 'article-video',
    path: '/article/bahdanovicz1',
    langs: BE,
    covers: ['video article', 'collection note'],
    unstable: ['video iframe'],
  },
  {
    name: 'article-carousel',
    path: '/article/football-culture-be',
    langs: BE,
    covers: ['CAROUSEL (swiper)'],
    unstable: ['slider position'],
  },
  {
    name: 'article-fillout-quiz',
    path: '/article/kiepska-budzie',
    langs: BE,
    covers: ['FILLOUT_QUIZ'],
    unstable: ['fillout embed'],
  },
  {
    name: 'article-exco-quiz',
    path: '/article/bielaruski',
    langs: BE,
    covers: ['ex.co quiz (SLUG_TO_EXCO_QUIZ_ID)'],
    unstable: ['ex.co embed'],
  },
  {
    name: 'article-timeline',
    path: '/article/skaryna-timeline',
    langs: BE,
    covers: ['TIMELINE'],
  },
  {
    name: 'article-coub-poem',
    path: '/article/paety20',
    langs: BE,
    covers: ['COUB', 'POEM', 'HEADING'],
    unstable: ['coub iframe'],
  },

  // listings
  { name: 'topic', path: '/topic/personalities', langs: ALL, covers: ['topic page'] },
  { name: 'tag', path: '/topic/personalities/tag/kupala', langs: ALL, covers: ['tag page'] },
  { name: 'collection', path: '/collection/bel-kino', langs: ALL, covers: ['collection page'] },

  // diary
  { name: 'diary-slug', path: '/diary/f31126', langs: ALL, covers: ['diary page', 'diary arrows'] },
  {
    name: 'diary-today',
    path: '/diary',
    langs: BE,
    covers: ['diary today', 'redirect to slug'],
    unstable: ['whole page depends on the current date (freeze clock)'],
  },

  // status / errors
  { name: 'status-404', path: '/status/404', langs: ALL, covers: ['404 page'] },
  { name: 'status-500', path: '/status/500', langs: BE, covers: ['500 page'] },
  {
    name: 'not-found',
    path: '/article/this-slug-does-not-exist',
    langs: BE,
    covers: ['404 via notFound'],
  },

  // games (no header/footer chrome)
  { name: 'game-ny2021', path: '/game/ny2021', langs: BE, covers: ['fortune game'] },
  {
    name: 'game-tinder',
    path: '/game/tinder',
    langs: BE,
    covers: ['tinder game'],
    unstable: ['shuffled profile order'],
  },
];

export const expandFixtures = (fixtures: Fixture[] = FIXTURES) =>
  fixtures.flatMap(f => f.langs.map(lang => ({ ...f, lang, url: `/${lang}${f.path}` })));
