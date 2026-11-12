# v3 for Майстэрня (https://wir.skarb.click): `npm run deploy` from v3/.
# Built on the NAS (linux/amd64). Standalone output: no node_modules in the runtime image.

# Dev API, same as the legacy dev deploy (bin/deploy/deploy-from-local.sh). The /api, /auth and
# /test rewrites are fixed at build time, so this must be set for `npm run build`.
ARG BACKEND_URL=https://api.wir.by

# glibc (not alpine): the lockfile comes from macOS, and the native binaries of next/swc,
# lightningcss and tailwind oxide are most reliable on linux-gnu.
FROM node:26-slim AS build
ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL \
    NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# postbuild copies public/ and .next/static into .next/standalone
RUN npm run build

FROM node:26-slim
ARG BACKEND_URL
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    BACKEND_URL=$BACKEND_URL \
    HOSTNAME=0.0.0.0 \
    PORT=8080
WORKDIR /app
COPY --from=build /app/.next/standalone ./
# The app runs as a non-root user and image files are read-only; only /data and /tmp are
# writable. Next writes its cache (incl. optimized images) to .next/cache, so point it at /tmp.
RUN ln -s /tmp/next-cache .next/cache
EXPOSE 8080
CMD ["sh", "-c", "mkdir -p /tmp/next-cache && exec node server.js"]
