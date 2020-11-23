import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import Link from 'components/common/Link';
import BgContainer from 'components/common/ui/BgContainer';
import { ThemeType } from 'utils/customPropTypes';
import { colorLooksBlack, colorLooksWhite, linkCn } from 'utils/ui';

import styles from './cardWrapper.module.scss';

export const DEFAULT_SIZES = ['xxl', 'xl', 'l', 'm'];
export const TAG_SIZES = ['s', 'xs', 'ms', 's-wide', 'xs-wide'];
export const SQUARE_SIZES = ['square-m', 'square-s'];
export const SIZES = DEFAULT_SIZES.concat(SQUARE_SIZES, TAG_SIZES, 'auto');

const b = bem(styles);

const HackLink = ({ children, className, slug, ...props }) => {
  if (slug === 'bielaruski') {
    return (
      <a href="/article/bielaruski/" className={cn(className, linkCn())}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} {...props}>
      {children}
    </Link>
  );
};

const CardWrapper = ({
  blockContextClass,
  className,
  size,
  sizeClass,
  children,
  image,
  color,
  theme,
  linkProps,
  onBackground,
  slug,
}) => (
  <HackLink slug={slug} className={size === 'auto' ? blockContextClass : sizeClass} {...linkProps}>
    <BgContainer
      className={cn(
        b({
          'theme-light': theme === 'light',
          'experiment-viershy-listapad-custom-color': slug === 'viershy-listapad',
          'with-border': onBackground ? colorLooksBlack(color) : colorLooksWhite(color),
        }),
        className
      )}
      color={color}
      image={image}
    >
      {children}
    </BgContainer>
  </HackLink>
);

CardWrapper.propTypes = {
  blockContextClass: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  sizeClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  image: PropTypes.string,
  theme: ThemeType,
  linkProps: PropTypes.shape({}).isRequired,
  onBackground: PropTypes.bool,
  slug: PropTypes.string,
};

CardWrapper.defaultProps = {
  blockContextClass: '',
  className: '',
  size: 'auto',
  sizeClass: '',
  color: '#ffffff',
  image: null,
  theme: 'light',
  onBackground: false,
  slug: '',
};

export default CardWrapper;
