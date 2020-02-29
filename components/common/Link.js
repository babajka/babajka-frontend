import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { useLocalization, useLocaleContext } from 'components/common/Text';

import { linkCn } from 'utils/ui';
import { Link as NextLink } from 'routes';

const Link = ({
  tag,
  className,
  params = {},
  children,
  disabled,
  dark,
  active,
  target,
  titleId,
  title,
  onMouseUp,
  noStyles,
  ...props
}) => {
  const lang = useLocaleContext();
  return (
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
          className: linkCn({ className, disabled, dark, active, noStyles }),
          target,
          title: useLocalization(titleId) || title,
          onMouseUp,
        },
        children
      )}
    </NextLink>
  );
};

Link.propTypes = {
  tag: PropTypes.node,
  children: PropTypes.node.isRequired,
  params: PropTypes.shape({}),
  target: PropTypes.oneOf(['', '_blank']),

  // a props
  titleId: PropTypes.string,
  title: PropTypes.string,
  onMouseUp: PropTypes.func,

  // ui props
  className: PropTypes.string,
  disabled: PropTypes.bool,
  dark: PropTypes.bool,
  active: PropTypes.bool,
  noStyles: PropTypes.bool,
};

Link.defaultProps = {
  tag: 'a',
  target: '',
  params: {},
  className: '',
  disabled: false,
  active: false,
  dark: false,
  noStyles: false,

  titleId: '',
  title: '',
  onMouseUp: noop,
};

export default Link;
