import type { NextConfig } from 'next';

// v3 lives inside the legacy repo, which has its own package-lock.json and node_modules. Without an
// explicit root, Next picks the parent as the workspace root and resolves packages from the legacy
// node_modules (e.g. a 2020 @opentelemetry/api, which breaks `next build`).
const ROOT = import.meta.dirname;

// `rewrites()` below is resolved once and written into the build output (routes-manifest.json),
// so the backend is fixed at `next build`: setting BACKEND_URL for `npm run start` has no effect.
// `npm run build` refuses to run without BACKEND_URL (`prebuild` in package.json), like legacy
// `make build`. The default is only for `next dev` and `next typegen`.
const BACKEND_URL = process.env.BACKEND_URL || 'https://api.wir.by';

// Paths that the legacy Express server (`server.js`) proxies to the backend.
// `/test` serves local fixtures from the backend's `public/test`, for fully local development.
// `/rss` is NOT here: on prod it's served by nginx on wir.by, not by the backend (api.wir.by/rss
// is a 404), so the Footer link must keep pointing at the nginx-served URL.
const PROXIED_PATHS = ['api', 'auth', 'test'];

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: ROOT,
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
  experimental: {
    agentUpgrade: 'security',
  },
  images: {
    // Phase 5 replaces the default optimizer with a custom loader that keeps the backend's `?w=`
    // resizing (and a Cloudinary loader for Cloudinary images). Until then, `search: ''` (as the
    // Next docs recommend) only allows `/api/files/*` URLs without a query string.
    localPatterns: [{ pathname: '/api/files/**', search: '' }],
    remotePatterns: [new URL('https://res.cloudinary.com/wir-by/**')],
  },
  turbopack: {
    root: ROOT,
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async rewrites() {
    return PROXIED_PATHS.map(segment => ({
      source: `/${segment}/:path*`,
      destination: `${BACKEND_URL}/${segment}/:path*`,
    }));
  },
};

export default nextConfig;
