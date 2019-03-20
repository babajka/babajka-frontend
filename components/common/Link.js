import React from 'react';

import LocaleContext from 'components/common/LocaleContext';
import LinkWrapper from 'components/common/ui/LinkWrapper';

import { Link } from 'routes';

// FIXME: refactor
export default ({
  params = {},
  lang: _,
  children,
  render = () => <LinkWrapper>{children}</LinkWrapper>,
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
