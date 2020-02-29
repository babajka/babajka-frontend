import 'styles/pages/about.scss';

import React from 'react';

import ExternalLink from 'components/common/ExternalLink';
import Text, { localize } from 'components/common/Text';
import {
  MetaTitle,
  MetaDescription,
  MetaKeywords,
  MetaImage,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';

import team from 'data/team.json';

import { PARTNERS } from 'constants/partners';

const getLogoUrl = name =>
  `https://res.cloudinary.com/wir-by/image/upload/c_scale,w_250,f_auto,q_auto/v1546529671/production/partners-logos/${name}`;

const AboutPage = ({ lang }) => (
  <>
    <MetaTitle title={localize('about.meta-title', lang)} />
    <MetaDescription description={localize('about.meta-description', lang)} />
    <MetaKeywords keywords={localize('about.meta-keywords', lang)} />
    <MetaImage url={DEFAULT_IMAGE} small />

    <div className="wir-content-padding about-page">
      <div className="about-page__heading">
        <Text id="about.section1-header" />
      </div>
      <div className="about-page__text about-page__text--margin-top-small">
        <Text id="about.section1-text" />
      </div>
      <div className="about-page__subheading about-page__subheading--mobile-only about-page__text--margin-top-large">
        <Text id="about.section-team-header" />
      </div>
      <div className="about-page__team">
        <div className="about-page__subheading about-page__teammate teammate teammate__placeholder">
          <Text id="about.section-team-header" />
        </div>
        {team.map(({ image, name, role }) => (
          <div key={name} className="about-page__teammate teammate">
            <img className="teammate__pic" src={image} alt={name[lang] || name.be} />
            <div className="teammate__name">{name[lang] || name.be}</div>
            <div className="teammate__role">{role[lang] || name.be}</div>
          </div>
        ))}
      </div>
      <div className="about-page__text about-page__text--margin-top-medium">
        <Text id="about.section-team-subtext">
          {(
            thanks,
            name1,
            descr1,
            name2,
            descr2,
            name3,
            descr3,
            name4,
            descr4,
            name5,
            descr5,
            name6,
            descr6
          ) => (
            <>
              {thanks}
              <b>{name1}</b>
              {descr1}
              <b>{name2}</b>
              {descr2}
              <b>{name3}</b>
              {descr3}
              <b>{name4}</b>
              {descr4}
              <b>{name5}</b>
              {descr5}
              <b>{name6}</b>
              {descr6}
            </>
          )}
        </Text>
      </div>
      <div className="about-page__text about-page__text--margin-top-medium">
        <Text id="about.section-team-subtext2">
          {(thanks, name, descr) => (
            <>
              {thanks}
              <b>{name}</b>
              {descr}
            </>
          )}
        </Text>
      </div>
      <div className="about-page__text--margin-top-large about-page__partners">
        <div className="about-page__subheading">
          <Text id="about.section-partners-header" />
        </div>
        <div className="about-page__partners-logos">
          {PARTNERS.map(({ id, img, url, className = '' }) => (
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
