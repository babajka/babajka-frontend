import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type BlockWrapperProps = {
  className?: string;
  withBackground?: boolean;
  negativeTop?: boolean;
  children: ReactNode;
};

/** Legacy features/layout/blocks/wrapper.js. */
const BlockWrapper = ({ className, withBackground, negativeTop, children }: BlockWrapperProps) => (
  <div
    className={cn(
      'content-padding',
      withBackground ? 'mt-20 mb-5 bg-black' : 'mt-[60px]',
      negativeTop && '-mt-[15px]',
      className
    )}
  >
    {children}
  </div>
);

export default BlockWrapper;
