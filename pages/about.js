import 'styles/pages/about.scss';

import React from 'react';

import ExternalLink from 'components/common/ExternalLink';
import Text, { localize } from 'components/common/Text';

import { PARTNERS } from 'constants/partners';

const getLogoUrl = name =>
  `https://res.cloudinary.com/wir-by/image/upload/c_scale,w_250,f_auto,q_auto/v1546529671/production/partners-logos/${name}`;

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
          <div key={id} className={`about-page__partner-logo ${className}`}>
            <ExternalLink href={url}>
              <img src={getLogoUrl(img)} alt={localize(`about.${id}`, lang)} />
            </ExternalLink>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutPage;
