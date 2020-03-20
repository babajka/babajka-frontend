import React from 'react';
import PropTypes from 'prop-types';

import styles from './placeholderCard.module.scss';

const PlaceholderCard = ({ blockContext }) => (
  <div className={blockContext.map(ctx => styles[`block-${ctx}`]).join(' ')}>
    <div className="placeholder" />
  </div>
);

PlaceholderCard.propTypes = {
  blockContext: PropTypes.arrayOf(PropTypes.string),
};

PlaceholderCard.defaultProps = {
  blockContext: [],
};

export default PlaceholderCard;
