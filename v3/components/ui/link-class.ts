import { cn } from '@/lib/utils/cn';

export type LinkStyleProps = {
  /** Dark theme (light text on dark backgrounds). */
  dark?: boolean;
  active?: boolean;
  disabled?: boolean;
  /** Inherit color and decoration (legacy `noStyles`). */
  noStyles?: boolean;
};

/** Legacy `linkCn` (utils/ui.js): the `.wir-link` classes as Tailwind utilities. */
export const linkClass = (
  { dark, active, disabled, noStyles }: LinkStyleProps = {},
  className?: string
) =>
  noStyles
    ? cn('text-inherit no-underline', className)
    : cn(
        'link',
        dark && 'link-dark',
        active && 'link-active',
        disabled && 'link-disabled',
        className
      );
