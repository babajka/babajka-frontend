import './link.scss';

import React from 'react';
import cn from 'classnames';

import Clickable from 'lib/components/Clickable';

export const getClass = ({ className, disabled, dark }) =>
  cn('wir-link', { 'wir-link--disabled': disabled, 'wir-link--theme-dark': dark }, className);

const LinkWrapper = props => {
  const { onClick } = props;
  const className = getClass(props);
  const newProps = {
    ...props,
    className,
    dark: undefined,
  };
  if (onClick) {
    return <Clickable {...newProps} />;
  }
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...newProps} />;
};

export default LinkWrapper;
