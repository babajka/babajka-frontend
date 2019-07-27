import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Link from 'components/common/Link';
import BgContainer from 'components/common/ui/BgContainer';

export const DEFAULT_SIZES = ['xxl', 'xl', 'l', 'm'];
export const TAG_SIZES = ['s', 'xs'];
export const SQUARE_SIZES = ['square-m', 'square-s'];
export const SIZES = DEFAULT_SIZES.concat(SQUARE_SIZES, TAG_SIZES);

const CardWrapper = ({ className, size, children, bgColor, bgImage, dark, linkProps }) => (
  <Link className={size ? `size-${size}` : ''} {...linkProps}>
    <BgContainer className={cn(className, { 'theme-dark': dark })} color={bgColor} image={bgImage}>
      {children}
    </BgContainer>
  </Link>
);

CardWrapper.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES).isRequired,
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string,
  bgImage: PropTypes.string,
  dark: PropTypes.bool,
  linkProps: PropTypes.shape({}).isRequired,
};

CardWrapper.defaultProps = {
  className: '',
  bgColor: null,
  bgImage: null,
  dark: false,
};

export default CardWrapper;
