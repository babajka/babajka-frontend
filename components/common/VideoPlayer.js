import React from 'react';
import PropTypes from 'prop-types';

import { MetaVideo } from 'components/common/layout/Metatags';
import Text from 'components/common/Text';
import { YOUTUBE_EMBED_PREFIX } from 'constants/social';

const VideoPlayer = ({ videoId }) => (
  <>
    <MetaVideo url={`${YOUTUBE_EMBED_PREFIX}/${videoId}`} />
    <Text
      id="article.article-image"
      render={t => (
        <div className="article__playerwrapper">
          <iframe
            id="ytplayer"
            className="article__player"
            title={t}
            type="text/html"
            src={`${YOUTUBE_EMBED_PREFIX}/${videoId}`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
    />
  </>
);

VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default VideoPlayer;
