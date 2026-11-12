import type { AnchorHTMLAttributes } from 'react';

import { linkClass, type LinkStyleProps } from './link-class';

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkStyleProps & {
    href: string;
    /** Use `className` as is, without the link styles (legacy `custom`). */
    custom?: boolean;
  };

/** Link to another site, in a new tab (legacy components/common/ExternalLink.js). */
const ExternalLink = ({
  className,
  custom,
  dark,
  active,
  disabled,
  noStyles,
  ...props
}: ExternalLinkProps) => (
  <a
    rel="noopener noreferrer"
    target="_blank"
    className={custom ? className : linkClass({ dark, active, disabled, noStyles }, className)}
    {...props}
  />
);

export default ExternalLink;
