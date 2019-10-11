import './blockWrapper.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const BlockWrapper = ({ className, withBackground, children }) => (
  <div
    className={cn(
      'wir-content-padding block',
      `block__${withBackground ? 'with' : 'no'}-background`,
      className
    )}
  >
    {children}
  </div>
);

BlockWrapper.propTypes = {
  className: PropTypes.string,
  withBackground: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

BlockWrapper.defaultProps = {
  className: '',
  withBackground: false,
};

export default BlockWrapper;
