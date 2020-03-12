import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import block from 'bem-css-modules';
import styles from './blockWrapper.module.scss';

const b = block(styles);

const BlockWrapper = ({ className, withBackground, negativeTop, children }) => (
  <div
    className={cn(
      'wir-content-padding',
      {
        'wir-with-background': withBackground,
        'wir-no-background': !withBackground,
      },
      b({ 'negative-margin-top': negativeTop }),
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
