import { notFound } from 'next/navigation';

// A 404 isn't an instant navigation target: skip instant-navigation validation for it (otherwise
// `next dev` logs that the segment couldn't render, which is the point of this page).
export const instant = false;

/**
 * Any URL under `/{lang}` that no page matches. Throwing here renders `(site)/not-found.tsx` with
 * the full chrome and the right locale, which a root-level 404 can't do with a `[lang]` root layout.
 */
export default function CatchAllNotFound() {
  notFound();
}
