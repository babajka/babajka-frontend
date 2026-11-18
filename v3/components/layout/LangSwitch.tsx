'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

import { LANGS, LOCALE_COOKIE_NAME, type Lang } from '@/constants';
import { linkClass } from '@/components/ui/link-class';
import { useLang } from '@/lib/i18n/client';
import { routes, switchLocale } from '@/lib/routes';

/**
 * Remember the choice: proxy.ts redirects to the WIR_LOCALE cookie locale. A session cookie on
 * path `/`, like legacy js-cookie (`Cookies.set(name, lang, { secure })`).
 */
export const setLocaleCookie = (lang: Lang) => {
  const secure = window.location.protocol === 'https:' ? '; secure' : '';
  document.cookie = `${LOCALE_COOKIE_NAME}=${lang}; path=/; samesite=lax${secure}`;
};

const LangLinks = ({ hrefFor }: { hrefFor: (lang: Lang) => ReturnType<typeof routes.main> }) => {
  const lang = useLang();
  return (
    <ul className="mt-0 mb-[38px] list-none p-0 tracking-[1px] text-primary uppercase">
      {LANGS.filter(({ id }) => id !== lang).map(({ id, label }) => (
        <li key={id}>
          <NextLink
            href={hrefFor(id)}
            hrefLang={id}
            lang={id}
            className={linkClass()}
            onClick={() => setLocaleCookie(id)}
          >
            {label}
          </NextLink>
        </li>
      ))}
    </ul>
  );
};

const CurrentPageLangLinks = () => {
  const pathname = usePathname();
  return <LangLinks hrefFor={lang => switchLocale(pathname, lang)} />;
};

/**
 * The other locales, linking to the same page (legacy Sidebar `langs`). The current path is only
 * known at request time on dynamic pages, so until it streams in, the links go to the main page in
 * that locale (same text, so no layout shift).
 */
const LangSwitch = (): ReactNode => (
  <Suspense fallback={<LangLinks hrefFor={routes.main} />}>
    <CurrentPageLangLinks />
  </Suspense>
);

export default LangSwitch;
