import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import Icon from 'components/common/ui/Icon';

import { IconPackShape } from 'utils/customPropTypes';
import styles from './ui/button.module.scss';

const b = bem(styles);

const Button = ({
  className,
  children,
  pending: _,
  highlighted,
  icon: { pack, name },
  ...props
}) => (
  <button type="button" className={cn(b({ highlighted }), className)} {...props}>
    {name && <Icon className={b('icon')} pack={pack} name={name} />}
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  pending: PropTypes.bool,
  highlighted: PropTypes.bool,
  icon: PropTypes.shape({
    pack: IconPackShape,
    name: PropTypes.string,
  }),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  pending: false,
  highlighted: false,
  icon: {
    pack: 's',
    name: '',
  },
  disabled: false,
};

export default Button;
