import React from 'react';
import cn from 'classnames';

import 'styles/src/kit/link/link.scss';

export default ({ className, children, disabled, dark, ...props }) => (
  <a
    className={cn(
      'wir-link',
      { 'wir-link--disabled': disabled, 'wir-link--theme-dark': dark },
      className
    )}
    {...props}
  >
    {children}
  </a>
);
