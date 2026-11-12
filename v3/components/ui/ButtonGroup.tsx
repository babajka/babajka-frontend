import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

/** Legacy components/common/ButtonGroup.js + ui/button-group.module.scss: joined buttons. */
const ButtonGroup = ({
  children,
  icon,
  className,
}: {
  children: ReactNode;
  /** Buttons share the width equally. */
  icon?: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      'relative flex text-[0.8rem]',
      '[&>button]:float-left [&>button]:border [&>button]:border-l-0 [&>button]:border-grey [&>button]:bg-white [&>button]:text-center [&>button]:outline-none',
      '[&>button:hover]:cursor-pointer [&>button:hover]:shadow-[inset_0_0_1px_var(--color-grey)]',
      '[&>button:first-child]:rounded-l-[5px] [&>button:first-child]:border-l',
      '[&>button:last-child]:rounded-r-[5px]',
      icon && '[&>button]:grow [&>button]:basis-auto',
      className
    )}
  >
    {children}
  </div>
);

export default ButtonGroup;
