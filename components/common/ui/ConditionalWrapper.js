import React from 'react';
import PropTypes from 'prop-types';

const ConditionalWrapper = ({ tag, children, hide, ...props }) => {
  if (hide) {
    return children;
  }
  return React.createElement(tag, props, children);
};

ConditionalWrapper.propTypes = {
  tag: PropTypes.oneOf(['div', 'span']),
  children: PropTypes.node.isRequired,
  hide: PropTypes.bool,
};

ConditionalWrapper.defaultProps = {
  tag: 'div',
  hide: false,
};

export default ConditionalWrapper;
