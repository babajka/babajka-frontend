import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';

import { buildBlockContextStyles } from './utils';

import styles from './placeholder.module.scss';

const b = bem(styles);

const PlaceholderCard = ({ blockContext }) => (
  <div className={buildBlockContextStyles(blockContext, styles)}>
    <div className={b()} />
  </div>
);

PlaceholderCard.propTypes = {
  blockContext: PropTypes.arrayOf(PropTypes.string),
};

PlaceholderCard.defaultProps = {
  blockContext: [],
};

export default PlaceholderCard;
