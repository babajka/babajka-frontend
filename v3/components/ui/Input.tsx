import type { ComponentType, InputHTMLAttributes, ReactNode, Ref } from 'react';

import Clickable from '@/components/Clickable';
import type { IconProps } from '@/components/icons/createIcon';
import { cn } from '@/lib/utils/cn';

import Spinner from './Spinner';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
  pending?: boolean;
  leftIcon?: ComponentType<IconProps> | false | null;
  rightIcon?: ComponentType<IconProps> | false | null;
  /** Accessible name of the right icon button. */
  rightLabel?: string;
  onRightClick?: () => void;
  error?: ReactNode;
};

// Legacy components/common/ui/Input.js + input.module.scss. The input comes first in the DOM and
// is the `peer`, so hover/focus/disabled of the input recolor the bar and icons after it (legacy
// `~` selectors); the left icon is moved before it visually with `order-first`.
const iconClass = (error: boolean) =>
  cn(
    'mt-[7px] mb-[2px] text-2xl text-black',
    'peer-hover:text-primary peer-focus:text-primary peer-disabled:text-grey',
    error && 'peer-hover:text-error peer-focus:text-error'
  );

const Input = ({
  ref,
  pending,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  rightLabel,
  onRightClick,
  error,
  disabled,
  placeholder,
  className,
  ...props
}: InputProps) => (
  <>
    <div className={cn('relative flex', className)}>
      <input
        ref={ref}
        type="text"
        className="peer mt-[5px] mb-1 h-[30px] min-w-0 grow border-0 bg-inherit text-xl outline-none autofill:transition-[background-color] autofill:duration-[5000s]"
        disabled={disabled}
        placeholder={placeholder}
        aria-label={placeholder}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {pending && (
        <span className={cn(iconClass(false), 'order-first mr-[11.5px]')}>
          <Spinner />
        </span>
      )}
      {LeftIcon && (
        <span className={cn(iconClass(!!error), 'order-first mr-[11.5px]')}>
          <LeftIcon />
        </span>
      )}
      {RightIcon && (
        <Clickable
          className={cn(iconClass(!!error), 'ml-[11.5px] cursor-pointer')}
          onClick={onRightClick}
          aria-label={rightLabel}
        >
          <RightIcon />
        </Clickable>
      )}
      <span
        className={cn(
          'absolute bottom-0 h-0.5 w-full bg-black',
          'peer-hover:bg-primary peer-focus:bg-primary peer-disabled:bg-grey',
          error && 'peer-hover:bg-error peer-focus:bg-error'
        )}
      />
    </div>
    {error && <p className="text-error">{error}</p>}
  </>
);

export default Input;
