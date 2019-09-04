import 'styles/pages/about.scss';

import React from 'react';

import ExternalLink from 'components/common/ExternalLink';
import Text, { localize } from 'components/common/Text';
import LocaleContext from 'components/common/LocaleContext';

const buildLogoLink = imgName =>
  `https://res.cloudinary.com/wir-by/image/upload/c_scale,w_250,f_auto,q_auto/v1546529671/production/partners-logos/${imgName}`;

const PartnerLogo = ({ className, externalUrl, imgName, altText }) => (
  <div className={`about-page__partner-logo ${className || ''}`}>
    <ExternalLink href={externalUrl}>
      <img src={buildLogoLink(imgName)} alt={altText} />
    </ExternalLink>
  </div>
);

const AboutPage = () => (
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
        {[
          {
            id: 'logo-shafa',
            img: 'shafa_logo.jpg',
            url: 'http://shafa-minsk.by/',
          },
          {
            id: 'logo-festyval-mou',
            img: 'festyval_mou_logo.jpg',
            url: 'http://minsklingfest.by/',
          },
          {
            id: 'logo-masaraksh',
            img: 'masaraksh_logo.jpg',
            url: 'https://vk.com/massaraksh_minsk',
          },
          {
            id: 'logo-ethno',
            img: 'ethno_logo.jpg',
            url: 'https://ethno.by',
            className: 'about-page__partner-logo--smallest',
          },
          {
            id: 'logo-libra',
            img: 'libra_logo.png',
            url: 'https://libra-gallery.by',
            className: 'about-page__partner-logo--small',
          },
          {
            id: 'logo-museum-brouka',
            img: 'museum_brouka_logo.jpg',
            url: 'http://brouka.museum.by/',
          },
        ].map(({ id, img, url, className }) => (
          <LocaleContext.Consumer>
            {lang => (
              <PartnerLogo
                className={className}
                id={id}
                externalUrl={url}
                imgName={img}
                altText={localize(`about.${id}`, lang)}
              />
            )}
          </LocaleContext.Consumer>
        ))}
      </div>
    </div>
  </div>
);

export default AboutPage;
