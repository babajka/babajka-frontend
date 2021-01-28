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

const getTrackUrl = trackId =>
  `${YANDEX_MUSIC_EMBED_PREFIX}/#track/${trackId}/${YANDEX_MUSIC_ALBUM_ID}`;

// Const values for Yandex Music Player Dimensions are not documented anywhere and are found empirically.

const YANDEX_MUSIC_PLAYER_HEIGHT = {
  desktop: 180,
  mobile: 380,
};

const YANDEX_MUSIC_PLAYER_SCREEN_THRESHOLD = 650;

const AudioPlayer = ({ trackId, width }) => {
  const height =
    useWindowWidth() < YANDEX_MUSIC_PLAYER_SCREEN_THRESHOLD
      ? YANDEX_MUSIC_PLAYER_HEIGHT.mobile
      : YANDEX_MUSIC_PLAYER_HEIGHT.desktop;

  return trackId ? (
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
  ) : (
    <div className={cn(b('content-unavailable'), typography['common-text'])}>
      <Text id="article.podcast-will-be-available-soon" />
    </div>
  );
};

AudioPlayer.propTypes = {
  trackId: PropTypes.string,
  width: PropTypes.string,
};

AudioPlayer.defaultProps = {
  width: '100%',
};

export default AudioPlayer;
