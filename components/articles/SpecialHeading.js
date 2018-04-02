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
  // TODO: to replace with some truly default image.
  imageUrl:
    'http://res.cloudinary.com/dhgy4yket/image/upload/c_scale,w_100/v1522527334/babajka-dev/kurilka.jpg',
};

export default SpecialHeading;
