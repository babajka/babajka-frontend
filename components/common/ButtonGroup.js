import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import block from 'bem-css-modules';
import styles from './ui/button-group.module.scss';

const b = block(styles);

const ButtonGroup = ({ children, icon, className }) => (
  <div className={cn(b(), icon && b('icon'), className)}>{children}</div>
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
