import './banner.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Picture from 'components/common/Picture';
import ExternalLink from 'components/common/ExternalLink';
import { useLocalization } from 'components/common/Text';

import BlockWrapper from './BlockWrapper';

const LINK = 'https://map.wir.by?utm_source=wirby-main-page';

const getLink = (width, name) =>
  `https://res.cloudinary.com/wir-by/image/upload/c_scale,w_${width},f_auto,q_auto/v1568474405/production/banners/mapa-all-sizes/${name}.png`;

const BANNERS = Object.entries({
  desktop: 1020,
  'tablet-large': 816,
  tablet: 624,
  touch: 480,
  mobile: 300,
}).reduce((acc, [name, size]) => {
  acc[name] = getLink(size, name);
  return acc;
}, {});

const BannerBlock = ({ block: { banner } }) => {
  const title = useLocalization('banners.mapa-title');
  return (
    <BlockWrapper>
      <div className={`banner banner-${banner}`}>
        <Picture sources={BANNERS} alt={title} />
        <ExternalLink href={LINK}>
          <div className={`banner__title banner-${banner}__title`}>{title}</div>
        </ExternalLink>
      </div>
    </BlockWrapper>
  );
};

BannerBlock.propTypes = {
  block: PropTypes.shape({
    banner: PropTypes.oneOf(['mapa']).isRequired,
  }).isRequired,
};

export default BannerBlock;
