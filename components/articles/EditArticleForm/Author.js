import React from 'react';
import PropTypes from 'prop-types';

import 'styles/legacy/components/select/author.scss';

const Author = ({ name, imageUrl }) => (
  <span className="user">
    <figure className="user-ava image is-32x32">
      <img alt={name} src={imageUrl} />
    </figure>
    <span className="table-card-user__name">{name}</span>
  </span>
);

Author.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Author;
