import React from 'react';
import PropTypes from 'prop-types';

import { YANDEX_MUSIC_EMBED_PREFIX, YANDEX_MUSIC_ALBUM_ID } from 'constants/social';

import styles from './audioVideoPlayer.module.scss';

const AudioPlayer = ({ trackId, width, height }) => (
  <div className={styles['article-page-interactive']}>
    <span>
      <iframe
        title="AudioPlayer"
        frameBorder="0"
        style={{ border: 'none', width, height }}
        width={width}
        height={height}
        src={`${YANDEX_MUSIC_EMBED_PREFIX}/#track/${trackId}/${YANDEX_MUSIC_ALBUM_ID}`}
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
  height: '180',
};

export default AudioPlayer;
