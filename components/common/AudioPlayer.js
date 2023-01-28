import typography from 'styles/typography.module.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import useWindowWidth from 'hooks/useWindowWidth';

import { YANDEX_MUSIC_EMBED_PREFIX, YANDEX_MUSIC_ALBUM_ID } from 'constants/social';

import styles from './audioVideoPlayer.module.scss';

import Text from './Text';

const b = bem(styles);

const getTrackUrl = (trackId, playlistUsername, playlistId) => {
  if (playlistUsername && playlistId) {
    return `${YANDEX_MUSIC_EMBED_PREFIX}/#playlist/${playlistUsername}/${playlistId}`;
  }
  if (trackId) {
    return `${YANDEX_MUSIC_EMBED_PREFIX}/#track/${trackId}/${YANDEX_MUSIC_ALBUM_ID}`;
  }
  return '';
};

// Const values for Yandex Music Player Dimensions are not documented anywhere and are found empirically.

const YANDEX_MUSIC_PLAYER_HEIGHT = {
  track: {
    desktop: 180,
    mobile: 380,
  },
  playlist: {
    desktop: 420,
    mobile: 480,
  },
};

const YANDEX_MUSIC_PLAYER_SCREEN_THRESHOLD = 650;

const AudioPlayer = ({ trackId, playlistUsername, playlistId, width }) => {
  const mode = playlistUsername && playlistId ? 'playlist' : 'track';

  const height =
    useWindowWidth() < YANDEX_MUSIC_PLAYER_SCREEN_THRESHOLD
      ? YANDEX_MUSIC_PLAYER_HEIGHT[mode].mobile
      : YANDEX_MUSIC_PLAYER_HEIGHT[mode].desktop;

  const srcUrl = getTrackUrl(trackId, playlistUsername, playlistId);

  if (!srcUrl) {
    return (
      <div className={cn(b('content-unavailable'), typography['common-text'])}>
        <Text id="article.audio-currently-not-available" />
      </div>
    );
  }

  return (
    <div className={styles['article-page-interactive']}>
      <span>
        <iframe
          title="AudioPlayer"
          key={trackId}
          frameBorder="0"
          style={{ border: 'none', width, height }}
          width={width}
          height={height}
          src={srcUrl}
        />
      </span>
    </div>
  );
};

AudioPlayer.propTypes = {
  trackId: PropTypes.string,
  playlistUsername: PropTypes.string,
  playlistId: PropTypes.string,
  width: PropTypes.string,
};

AudioPlayer.defaultProps = {
  trackId: '',
  playlistUsername: '',
  playlistId: '',
  width: '100%',
};

export default AudioPlayer;
