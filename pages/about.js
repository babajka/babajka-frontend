import 'styles/pages/about.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ExternalLink from 'components/common/ExternalLink';
import Text, { localize } from 'components/common/Text';

import { PARTNERS } from 'constants/partners';

const buildLogoLink = imgName =>
  `https://res.cloudinary.com/wir-by/image/upload/c_scale,w_250,f_auto,q_auto/v1546529671/production/partners-logos/${imgName}`;

const PartnerLogo = ({ className, externalUrl, imgName, altText }) => (
  <div className={`about-page__partner-logo ${className}`}>
    <ExternalLink href={externalUrl}>
      <img src={buildLogoLink(imgName)} alt={altText} />
    </ExternalLink>
  </div>
);

PartnerLogo.propTypes = {
  className: PropTypes.string,
  externalUrl: PropTypes.string.isRequired,
  imgName: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

PartnerLogo.defaultProps = {
  className: '',
};

const AboutPage = ({ lang }) => (
  <div className="about-page">
    <div className="about-page__header">
      <Text id="about.general-description" />
    </div>

    <div className="about-page__description-block">
      <div className="about-page__description-header">
        <Text id="about.section1-header" />
      </div>
      <div className="about-page__description-text">
        <Text id="about.section1-text" />
      </div>
    </div>

    <div className="about-page__description-block">
      <div className="about-page__description-header">
        <Text id="about.section2-header" />
      </div>
      <div className="about-page__description-text">
        <Text id="about.section2-text" />
      </div>
    </div>

    <div className="about-page__description-block">
      <div className="about-page__description-header">
        <Text id="about.section3-header" />
      </div>
      <div className="about-page__description-text">
        <ul>
          <li>
            <Text id="about.section3-text-item1" />
          </li>
          <li>
            <Text id="about.section3-text-item2" />
          </li>
          <li>
            <Text id="about.section3-text-item3" />
          </li>
          <li>
            <Text id="about.section3-text-item4" />
          </li>
        </ul>
      </div>
    </div>

    <div className="about-page__description-block">
      <div className="about-page__description-header">
        <Text id="about.section4-header" />
      </div>
      <div className="about-page__description-text about-page__partners">
        {PARTNERS.map(({ id, img, url, className }) => (
          <PartnerLogo
            className={className}
            id={id}
            key={id}
            externalUrl={url}
            imgName={img}
            altText={localize(`about.${id}`, lang)}
          />
        ))}
      </div>
    </div>
  </div>
);

export default AboutPage;
