import React from 'react';

import LocaleContext from 'components/common/LocaleContext';
import LinkWraper from 'components/common/LinkWraper';

import { Link } from 'routes';

// FIXME: refactor
export default ({
  params = {},
  lang: _,
  children,
  render = () => <LinkWraper>{children}</LinkWraper>,
  ...props
}) => (
  <LocaleContext.Consumer>
    {lang => (
      <Link
        {...props}
        params={{
          ...params,
          lang: params.lang || lang,
        }}
      >
        {render(children)}
      </Link>
    )}
  </LocaleContext.Consumer>
);
