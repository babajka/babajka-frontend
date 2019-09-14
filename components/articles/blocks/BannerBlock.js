import './banner.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ExternalLink from 'components/common/ExternalLink';
import Text, { localize } from 'components/common/Text';
import LocaleContext from 'components/common/LocaleContext';

import { BANNER_SIZES, PROJECTS } from 'constants/projects';

const BannerBlock = ({ block }) => {
  const projectName = block.banner;
  const data = PROJECTS[projectName];

  return (
    <div className="block block__no-background">
      {BANNER_SIZES.map(size => (
        <div className={`banner banner-${projectName} banner--size-${size}`}>
          <ExternalLink href={data.externalLink}>
            <LocaleContext.Consumer>
              {lang => (
                <img src={data.banners[size]} alt={localize(`banners.${data.labelKey}`, lang)} />
              )}
            </LocaleContext.Consumer>
            <div className={`banner__title banner-${projectName}__title`}>
              <Text id={`banners.${data.labelKey}`} />
            </div>
          </ExternalLink>
        </div>
      ))}
    </div>
  );
};

BannerBlock.propTypes = {
  block: PropTypes.shape({
    banner: PropTypes.oneOf(['mapa']).isRequired,
  }).isRequired,
};

export default BannerBlock;
