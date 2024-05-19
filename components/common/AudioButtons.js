import React from 'react';
import bem from 'bem-css-modules';

import ExternalLink from 'components/common/ExternalLink';
import { PODCASTS_PLATFORMS } from 'constants/social';
import styles from './audioVideoPlayer.module.scss';

const b = bem(styles);

// AudioButtons could be improved to accept episode IDs for each platform and to create per-episode links.
// We currently don't have this information in Fibery.
const AudioButtons = () => (
  <div className={b()}>
    <div className={b('audio-buttons')}>
      {PODCASTS_PLATFORMS.map(
        ({ id, label, link, badgeLink }) =>
          badgeLink && (
            <div key={id} className={b('audio-button')}>
              <ExternalLink href={link}>
                <img
                  src={badgeLink}
                  alt={label}
                  className={b('audio-button-image')}
                  loading="lazy"
                />
              </ExternalLink>
            </div>
          )
      )}
    </div>
  </div>
);

export default AudioButtons;
