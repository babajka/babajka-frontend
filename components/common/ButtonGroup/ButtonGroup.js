import './ButtonGroup.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

const ButtonGroup = ({ children, icon, className }) => (
  <div className={cn('wir-button-group', { 'wir-button-group__icon': icon }, className)}>
    {children}
  </div>
);

ButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  icon: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  className: '',
  icon: false,
};

export default ButtonGroup;
