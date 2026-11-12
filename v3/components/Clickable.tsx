import { createElement, type HTMLAttributes, type KeyboardEvent, type MouseEvent } from 'react';

// Ported from the legacy `lib` submodule (`lib/components/Clickable.js`): a non-button element that
// behaves like a button for keyboard users when it has an `onClick`.
// Legacy used the deprecated `onKeyPress`; this uses `onKeyDown` (same Enter behaviour).

type ClickableProps = Omit<HTMLAttributes<HTMLElement>, 'onClick'> & {
  tag?: keyof HTMLElementTagNameMap;
  onClick?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  disabled?: boolean;
};

const Clickable = ({
  tag = 'span',
  onClick,
  disabled = false,
  children = null,
  ...props
}: ClickableProps) => {
  const interactive = Boolean(onClick) && !disabled;

  return createElement(
    tag,
    {
      ...props,
      onClick,
      ...(interactive && {
        role: 'button',
        tabIndex: 0,
        onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
          props.onKeyDown?.(event);
          if (event.key === 'Enter') {
            onClick?.(event);
          }
        },
      }),
    },
    children
  );
};

export default Clickable;
