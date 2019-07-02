import 'components/common/ui/link.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import LocaleContext from 'components/common/LocaleContext';

import { Link as NextLink } from 'routes';

const Link = ({ className, params = {}, children, disabled, dark, ...props }) => (
  <LocaleContext.Consumer>
    {lang => (
      <NextLink
        {...props}
        params={{
          ...params,
          lang: params.lang || lang,
        }}
      >
        <a
          className={cn(className, {
            'wir-link--disabled': disabled,
            'wir-link--theme-dark': dark,
          })}
        >
          {children}
        </a>
      </NextLink>
    )}
  </LocaleContext.Consumer>
);

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  params: PropTypes.shape({}),
  disabled: PropTypes.bool,
  dark: PropTypes.bool,
};

Link.defaultProps = {
  className: 'wir-link',
  params: {},
  disabled: false,
  dark: false,
};

export default Link;
