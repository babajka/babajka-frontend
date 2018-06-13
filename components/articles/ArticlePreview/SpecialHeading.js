import React from 'react';
import PropTypes from 'prop-types';

const SpecialHeading = ({ slug, name, imageUrl }) => (
  <div className="media special-heading is-pulled-right">
    <div className="media-left">
      <figure className="image is-32x32">
        <a href={slug}>
          <img src={imageUrl} alt="Img" />
        </a>
      </figure>
    </div>
    <div className="media-content">
      <span className="subtitle is-6">{name}</span>
    </div>
  </div>
);

SpecialHeading.propTypes = {
  slug: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SpecialHeading;
