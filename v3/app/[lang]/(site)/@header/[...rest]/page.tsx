import { ToMainTitle } from '@/components/layout/Header';

// Pairs with the `[...rest]` 404 page, which opts out of instant validation (see there).
export const instant = false;

/**
 * Header title for every other page on client-side navigation. Without this catch-all, a slot keeps
 * its last content on soft navigation (e.g. the main page motto after going to /about).
 */
export default function RestHeader() {
  return <ToMainTitle />;
}
