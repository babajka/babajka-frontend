import React from 'react';
import PropTypes from 'prop-types';

import { YANDEX_MUSIC_EMBED_PREFIX, YANDEX_MUSIC_ALBUM_ID } from 'constants/social';

import styles from './audioVideoPlayer.module.scss';

const getTrackUrl = trackId =>
  `${YANDEX_MUSIC_EMBED_PREFIX}/#track/${trackId}/${YANDEX_MUSIC_ALBUM_ID}`;

const AudioPlayer = ({ trackId, width, height }) => (
  <div className={styles['article-page-interactive']}>
    <span>
      <iframe
        title="AudioPlayer"
        key={trackId}
        frameBorder="0"
        style={{ border: 'none', width, height }}
        width={width}
        height={height}
        src={getTrackUrl(trackId)}
      />
    </span>
  </div>
);

AudioPlayer.propTypes = {
  trackId: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

AudioPlayer.defaultProps = {
  width: '100%',
  height: '360',
};

export default AudioPlayer;
