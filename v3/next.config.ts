import path from 'node:path';

import type { NextConfig } from 'next';

// v3 lives inside the legacy repo, which has its own package-lock.json and node_modules. Without an
// explicit root, Next picks the parent as the workspace root and resolves packages from the legacy
// node_modules (e.g. a 2020 @opentelemetry/api, which breaks `next build`).
const ROOT = path.resolve(__dirname);

// Same default as legacy `constants/server.js`.
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
    // resizing (and a Cloudinary loader for Cloudinary images).
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
    return PROXIED_PATHS.map(path => ({
      source: `/${path}/:path*`,
      destination: `${BACKEND_URL}/${path}/:path*`,
    }));
  },
};

export default nextConfig;
