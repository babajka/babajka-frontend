import React from 'react';
import cn from 'classnames';

import 'styles/src/kit/link/link.scss';

export default ({ className, children, ...props }) => (
  <a className={cn('wir-link', className)} {...props}>
    {children}
  </a>
);
