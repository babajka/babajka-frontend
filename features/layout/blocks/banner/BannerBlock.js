import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';
import cn from 'classnames';

import Picture from 'components/common/ui/Picture';
import LocalLink from 'components/common/Link';
import ExternalLink from 'components/common/ExternalLink';
import { useLocalization } from 'components/common/Text';
import { NY2021 } from 'constants';
import BlockWrapper from 'features/layout/blocks/wrapper';
import styles from './banner.module.scss';

const b = bem(styles);

const CDN_HOST = 'https://res.cloudinary.com/wir-by/image/upload';
const BANNERS_AVAILABLE = ['mapa', 'ny2021', 'tinder'];
const LINK = {
  mapa: { href: 'https://map.wir.by?utm_source=wirby-main-page' },
  [NY2021]: { route: `game/${NY2021}` },
  tinder: { route: `game/tinder` },
};
const IMAGE_LINK = {
  mapa: (width, screen) =>
    `${CDN_HOST}/c_scale,w_${width},f_auto,q_auto/v1568474405/production/banners/mapa-all-sizes/${screen}.png`,
  [NY2021]: (width, screen) =>
    `${CDN_HOST}/c_scale,w_${width},f_auto,q_auto/v1607868560/production/banners/newyear2021-all-sizes/${screen}.png`,
  tinder: (width, screen) =>
    `${CDN_HOST}/c_scale,w_${width},f_auto,q_auto/v1613151926/production/banners/tinder-all-sizes/${screen}.png`,
};

const BANNERS = banner =>
  Object.entries({
    desktop: 1020,
    'tablet-large': 816,
    tablet: 624,
    touch: 480,
    mobile: 300,
  }).reduce((acc, [screen, size]) => {
    acc[screen] = IMAGE_LINK[banner](size, screen);
    return acc;
  }, {});

const BannerBlock = ({ block: { banner }, inViewport }) => {
  const title = useLocalization(`banners.${banner}-title`);
  const subtitle = useLocalization(`banners.${banner}-subtitle`);

  if (!BANNERS_AVAILABLE.includes(banner)) {
    return null;
  }

  const linkProps = LINK[banner];
  const Link = linkProps.route ? LocalLink : ExternalLink;

  return (
    <BlockWrapper>
      <div className={b()}>
        <Link {...linkProps}>
          <div className={cn(b('title'), b(`${banner}-title`))}>{title}</div>
          {[NY2021, 'tinder'].includes(banner) && (
            <div className={cn(b('subtitle'), b(`${banner}-subtitle`))}>{subtitle}</div>
          )}
          <Picture sources={BANNERS(banner)} alt={title} inViewport={inViewport} />
        </Link>
      </div>
    </BlockWrapper>
  );
};

BannerBlock.propTypes = {
  block: PropTypes.shape({
    banner: PropTypes.oneOf(BANNERS_AVAILABLE).isRequired,
  }).isRequired,
};

export default BannerBlock;
