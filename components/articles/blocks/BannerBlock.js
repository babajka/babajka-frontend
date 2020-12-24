import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';
import cn from 'classnames';

import Picture from 'components/common/ui/Picture';
import ExternalLink from 'components/common/ExternalLink';
import { useLocalization } from 'components/common/Text';
import styles from './banner.module.scss';

import BlockWrapper from './BlockWrapper';

const b = bem(styles);

const BANNERS_AVAILABLE = ['mapa', 'ny2021'];

const LINK = {
  mapa: 'https://map.wir.by?utm_source=wirby-main-page',
  ny2021: 'https://wir.by/game/ny2021',
};

const getLink = (name, width, screen) => {
  return {
    mapa: `https://res.cloudinary.com/wir-by/image/upload/c_scale,w_${width},f_auto,q_auto/v1568474405/production/banners/mapa-all-sizes/${screen}.png`,
    ny2021: `https://res.cloudinary.com/wir-by/image/upload/c_scale,w_${width},f_auto,q_auto/v1607868560/production/banners/newyear2021-all-sizes/${screen}.png`,
  }[name];
};

const BANNERS = banner =>
  Object.entries({
    desktop: 1020,
    'tablet-large': 816,
    tablet: 624,
    touch: 480,
    mobile: 300,
  }).reduce((acc, [screen, size]) => {
    acc[screen] = getLink(banner, size, screen);
    return acc;
  }, {});

const BannerBlock = ({ block: { banner } }) => {
  const title = useLocalization(`banners.${banner}-title`);
  const subtitle = useLocalization(`banners.${banner}-subtitle`);

  if (!BANNERS_AVAILABLE.includes(banner)) {
    return null;
  }

  return (
    <BlockWrapper>
      <div className={b()}>
        <ExternalLink href={LINK[banner]}>
          <div className={cn(b('title'), b(`${banner}-title`))}>{title}</div>
          {banner === 'ny2021' && (
            <div className={cn(b('subtitle'), b(`${banner}-subtitle`))}>{subtitle}</div>
          )}
          <Picture sources={BANNERS(banner)} alt={title} />
        </ExternalLink>
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
