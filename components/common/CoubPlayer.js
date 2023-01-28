import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';

import styles from './audioVideoPlayer.module.scss';

const b = bem(styles);

const CoubPlayer = ({ coubId }) => (
  <div className={b()}>
    <div className={b('coub')}>
      <iframe
        title="CoubPlayer"
        src={`//coub.com/embed/${coubId}?muted=false&autostart=false&originalSize=false&startWithHD=true`}
        width="100%"
        height="100%"
        allow="autoplay"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
);

CoubPlayer.propTypes = {
  coubId: PropTypes.string.isRequired,
};

export default CoubPlayer;
