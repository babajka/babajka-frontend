import './blockWrapper.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const BlockWrapper = ({ className, withBackground, children }) => (
  <div
    className={cn(
      'wir-content-padding block',
      { 'block__with-background': withBackground, 'block__no-background': !withBackground },
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
