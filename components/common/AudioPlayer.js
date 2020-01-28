import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import { SOUNDCLOUD_EMBED_PREFIX } from 'constants/social';

/* eslint-disable camelcase */
const getUrl = ({
  url,
  color,
  auto_play = false,
  hide_related = true,
  show_comments = false,
  show_user = true,
  show_reposts = true,
  show_teaser = false,
  visual = false,
}) =>
  `${SOUNDCLOUD_EMBED_PREFIX}/?${qs.stringify({
    url,
    color,
    auto_play,
    hide_related,
    show_comments,
    show_user,
    show_reposts,
    show_teaser,
    visual,
  })}`;
/* eslint-enable */

const AudioPlayer = ({ trackId, type, width, height, color }) => (
  <div className="article-page-interactive">
    <span className="article__playerwrapper">
      <iframe
        className="article__player"
        title="AudioPlayer"
        width={width}
        height={height}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={getUrl({
          url: `https://api.soundcloud.com/tracks/${trackId}`,
          color,
          visual: type === 'big',
        })}
      />
    </span>
  </div>
);

AudioPlayer.propTypes = {
  trackId: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.oneOf(['big', 'small']),
};

AudioPlayer.defaultProps = {
  width: '100%',
  height: '165',
  type: 'small',
  color: '',
};

export default AudioPlayer;
