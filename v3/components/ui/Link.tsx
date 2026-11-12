import NextLink from 'next/link';
import type { Route } from 'next';
import type { ComponentProps } from 'react';

import { linkClass, type LinkStyleProps } from './link-class';

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> &
  LinkStyleProps & {
    /** Build it with `routes` from `@/lib/routes`, which adds the locale. */
    href: Route;
  };

/** Internal link with the legacy link styles (legacy components/common/Link.js). */
const Link = ({ dark, active, disabled, noStyles, className, ...props }: LinkProps) => (
  <NextLink
    className={linkClass({ dark, active, disabled, noStyles }, className)}
    aria-disabled={disabled || undefined}
    {...props}
  />
);

export default Link;
