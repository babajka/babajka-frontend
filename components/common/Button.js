import './ui/button.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from 'components/common/ui/Icon';

import { IconPackShape } from 'utils/customPropTypes';

const Button = ({ className, children, pending, icon: { pack, name }, ...props }) => (
  <button
    type="button"
    className={cn('wir-kit-button', className, {
      'wir-kit-button__loading': pending,
    })}
    {...props}
  >
    {name && <Icon className="wir-kit-button__icon" pack={pack} name={name} />}
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  pending: PropTypes.bool,
  icon: PropTypes.shape({
    pack: IconPackShape,
    name: PropTypes.string,
  }),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  pending: false,
  icon: {
    pack: 's',
    name: '',
  },
  disabled: false,
};

export default Button;
