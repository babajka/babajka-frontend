import React from 'react';
import PropTypes from 'prop-types';

const CoubPlayer = ({ coubId, size }) => (
  <span>
    <iframe
      title="CoubPlayer"
      src={`//coub.com/embed/${coubId}?muted=false&autostart=false&originalSize=false&startWithHD=true`}
      width={size}
      height={size}
      allow="autoplay"
      frameBorder="0"
      allowFullScreen
    />
  </span>
);

CoubPlayer.propTypes = {
  coubId: PropTypes.string.isRequired,
  size: PropTypes.string,
};

CoubPlayer.defaultProps = {
  size: '480',
};

export default CoubPlayer;
