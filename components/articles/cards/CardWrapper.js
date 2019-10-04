import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Link from 'components/common/Link';
import BgContainer from 'components/common/ui/BgContainer';

export const DEFAULT_SIZES = ['xxl', 'xl', 'l', 'm'];
export const TAG_SIZES = ['s', 'xs', 'ms', 's-wide', 'xs-wide'];
export const SQUARE_SIZES = ['square-m', 'square-s'];
export const SIZES = DEFAULT_SIZES.concat(SQUARE_SIZES, TAG_SIZES, 'auto');

const CardWrapper = ({ className, size, children, color, image, dark, linkProps }) => (
  <Link className={`card-size-${size}`} {...linkProps}>
    <BgContainer className={cn(className, { 'theme-dark': dark })} color={color} image={image}>
      {children}
    </BgContainer>
  </Link>
);

CardWrapper.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  image: PropTypes.string,
  dark: PropTypes.bool,
  linkProps: PropTypes.shape({}).isRequired,
};

CardWrapper.defaultProps = {
  className: '',
  size: 'auto',
  color: null,
  image: null,
  dark: false,
};

export default CardWrapper;
