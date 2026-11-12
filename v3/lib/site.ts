// Site-wide settings for metadata and absolute URLs.

/**
 * `production` only on the real wir.by deploy (like legacy `WIR_ENV`). Everything else (local,
 * CI, the Майстэрня preview) is noindex and uses the dev apple-touch icon.
 */
export const IS_PROD = process.env.WIR_ENV === 'production';

/**
 * Absolute origin for metadata (og:url, og:image). Legacy `utils/host.js` used wir.by / dev.wir.by /
 * localhost:3000; v3 reads SITE_URL (set in the Dockerfile for the preview) at build time.
 */
export const SITE_URL =
  process.env.SITE_URL || (IS_PROD ? 'https://wir.by' : 'http://localhost:3001');

/** Where prod serves the RSS feed (static file on nginx, not part of this app). */
export const RSS_URL = 'https://wir.by/rss';

const CLOUDINARY = 'https://res.cloudinary.com/wir-by/image/upload';

// Legacy constants/assets.js and components/social/Metatags.js
export const FAVICON_URL = `${CLOUDINARY}/v1567534508/production/favicon/favicon.png`;
export const APPLE_TOUCH_ICON = IS_PROD
  ? `${CLOUDINARY}/v1567587889/production/favicon/apple-touch-icon.png`
  : `${CLOUDINARY}/v1567588308/production/favicon/apple-touch-icon-dev.png`;
export const DEFAULT_IMAGE = `${CLOUDINARY}/v1580048273/production/meta/meta-large.png`;
export const THEME_COLOR = '#1a9582';

export const HELP_EMAIL = 'wir.help@gmail.com';
export const DEV_EMAIL = 'wir.development@gmail.com';
