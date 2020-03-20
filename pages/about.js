import styles from 'styles/pages/about.module.scss';
import teammateStyles from 'components/social/teammate.module.scss';

import React from 'react';
import cn from 'classnames';
import bem from 'bem-css-modules';

import ExternalLink from 'components/common/ExternalLink';
import Text, { localize } from 'components/common/Text';
import {
  MetaTitle,
  MetaDescription,
  MetaKeywords,
  MetaImage,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';
import Teammate from 'components/social/Teammate';
import { Thanks1, Thanks2 } from 'components/social/Thanks';

import team from 'data/team.json';
import { PARTNERS } from 'constants/partners';

const b = bem(styles);
const t = bem(teammateStyles);

const getLogoUrl = name =>
  `https://res.cloudinary.com/wir-by/image/upload/c_scale,w_250,f_auto,q_auto/v1546529671/production/partners-logos/${name}`;

const AboutPage = ({ lang }) => (
  <>
    <MetaTitle title={localize('about.meta-title', lang)} />
    <MetaDescription description={localize('about.meta-description', lang)} />
    <MetaKeywords keywords={localize('about.meta-keywords', lang)} />
    <MetaImage url={DEFAULT_IMAGE} small />

    <div className={cn('wir-content-padding', b())}>
      <div className={b('heading')}>
        <Text id="about.section1-header" />
      </div>
      <div className={b('text', { 'margin-top': 'small' })}>
        <Text id="about.section1-text" />
      </div>
      <div
        className={cn(
          b('subheading', { 'mobile-only': true }),
          styles['about-page__text--margin-top--large']
        )}
      >
        <Text id="about.section-team-header" />
      </div>
      <div className={b('team')}>
        <div className={cn(b('subheading'), t(), t('placeholder'))}>
          <Text id="about.section-team-header" />
        </div>
        {team.map(({ image, name, role }) => (
          <Teammate
            key={image}
            image={image}
            name={name[lang] || name.be}
            role={role[lang] || role.be}
          />
        ))}
      </div>
      <div className={b('text', { 'margin-top': 'medium' })}>
        <Thanks1 />
      </div>
      <div className={b('text', { 'margin-top': 'medium' })}>
        <Thanks2 />
      </div>
      <div className={styles['about-page__text--margin-top--large']}>
        <div className={b('subheading')}>
          <Text id="about.section-partners-header" />
        </div>
        <div className={b('partners-logos')}>
          {PARTNERS.map(({ id, img, url, size = undefined }) => (
            <div key={id} className={b('partner-logo', { size })}>
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
