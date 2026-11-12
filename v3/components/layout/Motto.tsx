'use client';

import NextLink from 'next/link';
import { useSyncExternalStore, type ReactNode } from 'react';

import type { Topic } from '@/constants';
import { linkClass } from '@/components/ui/link-class';
import { ClientText, useLang } from '@/lib/i18n/client';
import { routes } from '@/lib/routes';

const CULTURE = ['art', 'cinema', 'literature']; // + 'music' (legacy)

// Picked once per page load in the browser; the server (and hydration) always use the first one,
// so there's no hydration mismatch.
const clientCulture =
  typeof window === 'undefined' ? CULTURE[0] : CULTURE[Math.floor(Math.random() * CULTURE.length)];
const subscribe = () => () => {};
const useCulture = () =>
  useSyncExternalStore(
    subscribe,
    () => clientCulture,
    () => CULTURE[0]
  );

/**
 * The header motto on the main page (legacy components/layout/header/Motto.js). Each word links to
 * a tag. "culture" links to a random culture tag, picked after mount, so the server render is stable
 * (mask this link in visual tests).
 */
const Motto = () => {
  const lang = useLang();
  const culture = useCulture();

  const tag = (topic: Topic, slug: string, text: ReactNode) => (
    <NextLink href={routes.tag(lang, topic, slug)} className={linkClass()}>
      {text}
    </NextLink>
  );

  return (
    <>
      <span className="hidden tablet:inline">
        <ClientText
          id="common.motto"
          render={(bel, asWell, world, cultureText, and, history) => (
            <>
              {tag('locations', 'belarus', bel)}
              {asWell}
              {tag('locations', 'europe', world)}
              <span data-unstable="motto">{tag('themes', culture, cultureText)}</span>
              {and}
              {tag('themes', 'history', history)}
            </>
          )}
        />
      </span>
      <span className="tablet:hidden">
        <ClientText
          id="common.motto-short"
          render={(edu, wir) => (
            <>
              {edu}
              <NextLink href={routes.about(lang)} className={linkClass()}>
                {wir}
              </NextLink>
            </>
          )}
        />
      </span>
    </>
  );
};

export default Motto;
