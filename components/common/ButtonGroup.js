import './ui/button-group.scss';

import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

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
