import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import styles from './wrapper.module.scss';

const b = bem(styles);

const BlockWrapper = ({ className, withBackground, negativeTop, children }) => (
  <div
    className={cn(
      'wir-content-padding',
      b({
        'with-background': withBackground,
        'no-background': !withBackground,
        'negative-margin-top': negativeTop,
      }),
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
