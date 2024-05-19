import React from 'react';
import bem from 'bem-css-modules';

import ExternalLink from 'components/common/ExternalLink';
import { PODCASTS_PLATFORMS } from 'constants/social';
import styles from './audioVideoPlayer.module.scss';

const b = bem(styles);

const AudioButtons = ({ trackIds }) => (
  <div className={b()}>
    <div className={b('audio-buttons')}>
      {PODCASTS_PLATFORMS.map(({ id, label, link, badgeLink, episodeLink }) => {
        const externalLink = episodeLink && trackIds[id] ? episodeLink(trackIds[id]) : link;
        return (
          badgeLink && (
            <div key={id} className={b('audio-button')}>
              <ExternalLink href={externalLink}>
                <img
                  src={badgeLink}
                  alt={label}
                  className={b('audio-button-image')}
                  loading="lazy"
                />
              </ExternalLink>
            </div>
          )
        );
      })}
    </div>
  </div>
);

export default AudioButtons;
