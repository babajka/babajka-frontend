import type { ReactNode } from 'react';

import Logo from '@/components/Logo';
import Link from '@/components/ui/Link';
import { getLang, getT, Text } from '@/lib/i18n/server';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils/cn';

import Burger from './Burger';

/** One item of the header title area (legacy `.navbar__title`). */
export const HeaderTitle = ({ children }: { children: ReactNode }) => (
  <div
    className={cn(
      'not-last:pb-2.5',
      'tablet:flex tablet:flex-col tablet:justify-around tablet:not-last:pr-5 tablet:not-last:pb-0'
    )}
  >
    {children}
  </div>
);

/** Default title: a link to the main page ("Wir.by" on games, like legacy). */
export const ToMainTitle = async ({ label }: { label?: string }) => {
  const lang = await getLang();
  return (
    <HeaderTitle>
      <Link href={routes.main(lang)}>{label ?? <Text id="header.to-main" />}</Link>
    </HeaderTitle>
  );
};

/**
 * Legacy components/layout/header/Header.js. `title` is the `@header` slot of the (site) layout:
 * the motto on the main page, "to main" elsewhere, plus page-specific links (legacy HeaderLinks).
 */
const Header = async ({ title, color }: { title: ReactNode; color?: string }) => {
  const lang = await getLang();
  const t = await getT(lang);

  return (
    <header className="flex flex-row items-start p-6">
      <Link
        href={routes.main(lang)}
        title={t('header.to-main')}
        aria-label={t('header.to-main')}
        className="size-[42px] shrink-0"
      >
        <Logo size={42} color={color} />
      </Link>
      <div className="mx-[18px] flex min-h-[42px] flex-col justify-around text-base leading-4 tracking-[1px] uppercase tablet:flex-row tablet:justify-start">
        {title}
      </div>
      <Burger color={color} />
    </header>
  );
};

export default Header;
