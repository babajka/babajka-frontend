import React from 'react';
import PropTypes from 'prop-types';

const SpecialHeading = ({ slug, name, imagePath }) => (
  <div className="media special-heading is-pulled-right">
    <div className="media-left">
      <figure className="image is-32x32">
        <a href={slug}>
          <img src={imagePath} alt="Img" />
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
  imagePath: PropTypes.string,
  name: PropTypes.string.isRequired,
};

SpecialHeading.defaultProps = {
  imagePath: './static/images/kurilka_icon.png',
};

export default SpecialHeading;