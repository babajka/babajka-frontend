import React from 'react';
import PropTypes from 'prop-types';

const Clickable = ({ tag, onClick, children, ...props }) => {
  const elementProps = {
    ...props,
    onClick,
  };

  elementProps.role = 'button';
  elementProps.tabIndex = 0;
  elementProps.onKeyPress = event => {
    if (event.key === 'Enter') {
      onClick(event);
    }
  };

  return React.createElement(tag, elementProps, children);
};

Clickable.propTypes = {
  tag: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Clickable.defaultProps = {
  tag: 'span',
  children: null,
};

export default Clickable;
