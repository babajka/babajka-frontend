import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';

import { buildBlockContextStyles } from './auto';

import styles from './placeholderCard.module.scss';

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
