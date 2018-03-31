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

/* TODO: need to take appropriate picture (perhaps, using slug or name) */

SpecialHeading.propTypes = {
  slug: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
};

SpecialHeading.defaultProps = {
  imageUrl: './static/images/kurilka_icon.png',
};

export default SpecialHeading;
