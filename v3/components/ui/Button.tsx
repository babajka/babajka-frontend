import type { ButtonHTMLAttributes, ComponentType } from 'react';

import type { IconProps } from '@/components/icons/createIcon';
import { cn } from '@/lib/utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  highlighted?: boolean;
  icon?: ComponentType<IconProps>;
};

/** Legacy components/common/Button.js + ui/button.module.scss (.wir-kit-button). */
const Button = ({ className, highlighted, icon: Icon, children, ...props }: ButtonProps) => (
  <button
    type="button"
    className={cn(
      'cursor-pointer rounded-[5px] border border-table bg-white px-5 py-2.5 text-sm leading-6 outline-none hover:text-primary active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]',
      highlighted && 'border-0 bg-primary text-white hover:text-concrete',
      className
    )}
    {...props}
  >
    {Icon && <Icon className="pr-[5px]" />}
    {children}
  </button>
);

export default Button;
