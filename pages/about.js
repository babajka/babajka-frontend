import 'styles/pages/about.scss';

import React from 'react';

import ExternalLink from 'components/common/ExternalLink';
import Text from 'components/common/Text';

const buildLogoLink = imgName =>
  `https://res.cloudinary.com/wir-by/image/upload/c_scale,w_250,f_auto,q_auto/v1546529671/production/partners-logos/${imgName}`;

const PartnerLogo = ({ classNames, externalUrl, imgName, altText }) => (
  <div className={`about-page__partner-logo ${classNames}`}>
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
        <PartnerLogo
          externalUrl="http://shafa-minsk.by/"
          imgName="shafa_logo.jpg"
          altText="Лагатып Кніжнай Шафы"
        />
        <PartnerLogo
          externalUrl="http://minsklingfest.by/"
          imgName="festyval_mou_logo.jpg"
          altText="Лагатып Фестываля Моў у Мінску"
        />
        <PartnerLogo
          externalUrl="https://vk.com/massaraksh_minsk"
          imgName="masaraksh_logo.jpg"
          altText="Лагатып суполкі Масаракш Мінск"
        />
        <PartnerLogo
          classNames="about-page__partner-logo--smallest"
          externalUrl="https://ethno.by"
          imgName="ethno_logo.jpg"
          altText="Лагатып Этнаўсё"
        />
        <PartnerLogo
          classNames="about-page__partner-logo--small"
          externalUrl="https://libra-gallery.by"
          imgName="libra_logo.png"
          altText="Лагатып галерэі Libra"
        />
        <PartnerLogo
          externalUrl="http://brouka.museum.by/"
          imgName="museum_brouka_logo.jpg"
          altText="Лагатып Літаратурнага музея Пятруся Броўкі"
        />
      </div>
    </div>
  </div>
);

export default AboutPage;
