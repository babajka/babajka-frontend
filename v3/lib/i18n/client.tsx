'use client';

// Client-side i18n for interactive islands (sidebar, subscribe form, games, …).
// The root layout passes the current locale and its resolved messages once.
import { createContext, use, type ReactNode } from 'react';

import { DEFAULT_LOCALE, type Lang } from '@/constants';

// Only `./shared`, never `./dict`: that would put the whole dictionary into the client bundle
// (it's `server-only`, so the build would fail).
import { splitParts, type ClientKey, type ClientMessages } from './shared';

type I18nContextValue = { lang: Lang; messages: ClientMessages | null };

const I18nContext = createContext<I18nContextValue>({ lang: DEFAULT_LOCALE, messages: null });

export const I18nProvider = ({
  lang,
  messages,
  children,
}: I18nContextValue & { children: ReactNode }) => (
  <I18nContext value={{ lang, messages }}>{children}</I18nContext>
);

export const useLang = () => use(I18nContext).lang;

/** `const t = useT(); t('footer.subscribe')`. Missing keys render as the key, like legacy. */
export const useT = () => {
  const { messages } = use(I18nContext);
  return (id: ClientKey) => messages?.[id] ?? id;
};

type ClientTextProps = {
  id: ClientKey;
  render?: (...parts: string[]) => ReactNode;
};

/** Client version of `<Text>` (see lib/i18n/server.tsx). */
export const ClientText = ({ id, render = first => first }: ClientTextProps) => {
  const t = useT();
  return <>{render(...splitParts(t(id)))}</>;
};
