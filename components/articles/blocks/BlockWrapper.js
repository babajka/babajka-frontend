import './blockWrapper.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const BlockWrapper = ({ className, withBackground, negativeTop, children }) => (
  <div
    className={cn(
      'wir-content-padding',
      {
        'wir-with-background': withBackground,
        'wir-no-background': !withBackground,
      },
      'block',
      { 'block--negative-margin-top': negativeTop },
      className
    )}
  >
    {children}
  </div>
);

BlockWrapper.propTypes = {
  className: PropTypes.string,
  withBackground: PropTypes.bool,
  negativeTop: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

BlockWrapper.defaultProps = {
  className: '',
  withBackground: false,
  negativeTop: false,
};

export default BlockWrapper;
