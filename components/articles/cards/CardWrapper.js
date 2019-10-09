import './wrapper.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Link from 'components/common/Link';
import BgContainer from 'components/common/ui/BgContainer';
import { ThemeType } from 'utils/customPropTypes';

export const DEFAULT_SIZES = ['xxl', 'xl', 'l', 'm'];
export const TAG_SIZES = ['s', 'xs', 'ms', 's-wide', 'xs-wide'];
export const SQUARE_SIZES = ['square-m', 'square-s'];
export const SIZES = DEFAULT_SIZES.concat(SQUARE_SIZES, TAG_SIZES, 'auto');

const CardWrapper = ({ className, size, children, image, color, theme, linkProps }) => (
  <Link className={`card-size-${size}`} {...linkProps}>
    <BgContainer
      className={cn('wir-card-wrapper', className, { 'theme-light': theme === 'light' })}
      color={color}
      image={image}
    >
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
  theme: ThemeType,
  linkProps: PropTypes.shape({}).isRequired,
};

CardWrapper.defaultProps = {
  className: '',
  size: 'auto',
  color: null,
  image: null,
  theme: 'light',
};

export default CardWrapper;
