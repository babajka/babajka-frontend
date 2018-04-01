import React from 'react';

import { Link } from 'routes';
import LocaleContext from 'components/common/LocaleContext';

export default ({ params = {}, ...props }) => (
  <LocaleContext.Consumer>
    {lang => (
      <Link
        {...props}
        params={{
          ...params,
          lang: params.lang || lang,
        }}
      />
    )}
  </LocaleContext.Consumer>
);
