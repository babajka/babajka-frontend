import React from 'react';
import PropTypes from 'prop-types';

import { YOUTUBE_EMBED_PREFIX } from 'constants/social';

const VideoPlayer = ({ videoId, width, height }) => (
  <div className="article-page-interactive">
    <div className="article-page-interactive__video">
      <span className="article-page__playerwrapper">
        <iframe
          id="ytplayer"
          className="article__player"
          title="VideoPlayer"
          width={width}
          height={height}
          type="text/html"
          src={`${YOUTUBE_EMBED_PREFIX}/${videoId}`}
          frameBorder="0"
          allowFullScreen
        />
      </span>
    </div>
  </div>
);

VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

VideoPlayer.defaultProps = {
  width: '100%',
  height: '100%',
};

export default VideoPlayer;
