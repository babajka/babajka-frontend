import type { Route } from 'next';
import type { CSSProperties, ReactNode } from 'react';

import Link from '@/components/ui/Link';
import { cn } from '@/lib/utils/cn';
import { colorLooksBlack, colorLooksWhite } from '@/utils/color';

export type CardTheme = 'light' | 'dark';

type CardWrapperProps = {
  href: Route;
  /** Size utilities per breakpoint, see components/cards/sizes.ts. */
  sizeClassName: string;
  className?: string;
  color?: string;
  image?: string;
  theme?: CardTheme;
  /** The card is on a black background, so a black card needs the border, not a white one. */
  onBackground?: boolean;
  slug?: string;
  slavics?: boolean;
  children: ReactNode;
  dataAttributes?: Record<`data-${string}`, true | undefined>;
};

const getTextColor = (theme: CardTheme, slug?: string) => {
  if (slug === 'viershy-listapad') {
    return 'var(--color-viershy)';
  }
  return theme === 'light' ? 'var(--color-black)' : 'var(--color-white)';
};

/** Legacy features/layout/cards/wrapper.js. */
const CardWrapper = ({
  href,
  sizeClassName,
  className,
  color = '#ffffff',
  image,
  theme = 'light',
  onBackground = false,
  slug,
  slavics,
  children,
  dataAttributes,
}: CardWrapperProps) => {
  const style = {
    backgroundColor: color,
    ...(image && { backgroundImage: `url(${image})` }),
    '--card-bg': color,
    '--card-text': getTextColor(theme, slug),
  } as CSSProperties;

  return (
    <Link href={href} className={cn('block', sizeClassName)} noStyles>
      <div
        className={cn('wir-card', className)}
        style={style}
        data-edge={colorLooksBlack(color) || colorLooksWhite(color) || undefined}
        data-border={(onBackground ? colorLooksBlack(color) : colorLooksWhite(color)) || undefined}
        data-slavics={slavics || undefined}
        {...dataAttributes}
      >
        {children}
      </div>
    </Link>
  );
};

export default CardWrapper;
