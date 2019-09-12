import React from 'react';
import PropTypes from 'prop-types';

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
          className: linkCn({ className, disabled, dark, active }),
          target,
          title: useLocalization(titleId) || title,
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

  // ui props
  className: PropTypes.string,
  disabled: PropTypes.bool,
  dark: PropTypes.bool,
  active: PropTypes.bool,
};

Link.defaultProps = {
  tag: 'a',
  target: '',
  params: {},
  className: '',
  disabled: false,
  active: false,
  dark: false,

  titleId: '',
  title: '',
};

export default Link;
