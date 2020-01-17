import 'styles/pages/about.scss';

import React from 'react';

import ExternalLink from 'components/common/ExternalLink';
import Text, { localize } from 'components/common/Text';
import { MetaTitle, MetaDescription, MetaKeywords, MetaImage } from 'components/social/Metatags';

import team from 'data/team.json';

import { PARTNERS } from 'constants/partners';

const getLogoUrl = name =>
  `https://res.cloudinary.com/wir-by/image/upload/c_scale,w_250,f_auto,q_auto/v1546529671/production/partners-logos/${name}`;

const AboutPage = ({ lang }) => (
  <>
    <MetaTitle title={localize('about.meta-title', lang)} type="article" />
    <MetaDescription description={localize('about.meta-description', lang)} />
    <MetaKeywords keywords={localize('about.meta-keywords', lang)} />
    <MetaImage url="" />

    <div className="wir-content-padding about-page">
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
          <Text id="about.section-team-header" />
        </div>
        <div className="about-page__description-text about-page__team">
          {team.map(({ image, name, role }) => (
            <div className="about-page__teammate teammate">
              <img className="teammate__pic" src={image} alt={name[lang]} />
              <div className="teammate__name">{name[lang]}</div>
              <div className="teammate__role">{role[lang]}</div>
            </div>
          ))}
        </div>
        <div className="about-page__description-text">
          <Text id="about.section-team-subtext">
            {(thanks, name1, descr1, name2, descr2, name3, descr3) => (
              <>
                {thanks}
                <b>{name1}</b>
                {descr1}
                <b>{name2}</b>
                {descr2}
                <b>{name3}</b>
                {descr3}
              </>
            )}
          </Text>
        </div>
      </div>

      <div className="about-page__description-block">
        <div className="about-page__description-header">
          <Text id="about.section-partners-header" />
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
  </>
);

export default AboutPage;
