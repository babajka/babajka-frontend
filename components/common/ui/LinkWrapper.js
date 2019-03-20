import React from 'react';
import cn from 'classnames';

import 'styles/src/kit/link/link.scss';

export default ({ className, children, disabled, ...props }) => (
  <a className={cn('wir-link', { 'wir-link--disabled': disabled }, className)} {...props}>
    {children}
  </a>
);
