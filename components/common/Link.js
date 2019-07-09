import React from 'react';
import PropTypes from 'prop-types';

import LocaleContext from 'components/common/LocaleContext';

import { linkCn } from 'utils/ui';
import { Link as NextLink } from 'routes';

const Link = ({ tag, className, params = {}, children, disabled, dark, ...props }) => (
  <LocaleContext.Consumer>
    {lang => (
      <NextLink
        {...props}
        params={{
          ...params,
          lang: params.lang || lang,
        }}
      >
        {React.createElement(
          tag,
          {
            className: linkCn({ className, disabled, dark }),
          },
          children
        )}
      </NextLink>
    )}
  </LocaleContext.Consumer>
);

Link.propTypes = {
  tag: PropTypes.node,
  children: PropTypes.node.isRequired,
  params: PropTypes.shape({}),

  // ui props
  className: PropTypes.string,
  disabled: PropTypes.bool,
  dark: PropTypes.bool,
};

Link.defaultProps = {
  tag: 'a',
  params: {},
  className: '',
  disabled: false,
  dark: false,
};

export default Link;
