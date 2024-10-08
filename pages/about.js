import styles from 'styles/pages/about.module.scss';
// import teammateStyles from 'features/about/teammate.module.scss';

import React from 'react';
import cn from 'classnames';
import bem from 'bem-css-modules';

// import ExternalLink from 'components/common/ExternalLink';
import Text, { localize } from 'components/common/Text';
import {
  MetaTitle,
  MetaDescription,
  MetaKeywords,
  MetaImage,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';

// import Teammate from 'features/about/Teammate';
// import { Thanks } from 'features/about/Thanks';
// import team from 'data/team.json';

// import { PARTNERS } from 'constants/partners';

const b = bem(styles);
// const t = bem(teammateStyles);

const AboutPage = ({ lang }) => (
  <>
    <MetaTitle title={localize('about.meta-title', lang)} />
    <MetaDescription description={localize('about.meta-description', lang)} />
    <MetaKeywords keywords={localize('about.meta-keywords', lang)} />
    <MetaImage url={DEFAULT_IMAGE} small />

    <div className={cn('wir-content-padding', b())}>
      <h1 className={b('heading')}>
        <Text id="about.section1-header" />
      </h1>
      <div className={b('text', { 'margin-top': 'small' })}>
        <Text id="about.section1-text" />
      </div>
      {/*
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
      {Array.from({ length: 3 }).map((_, idx) => (
        <div className={b('text', { 'margin-top': 'medium' })}>
          <Thanks idx={idx + 1} />
        </div>
      ))}
      */}
      {/* <div className={styles['about-page__text--margin-top--large']}>
        <div className={b('subheading')}>
          <Text id="about.section-partners-header" />
        </div>
        <div className={b('partners-logos')}>
          {PARTNERS.map(({ id, img, url, size = undefined }) => (
            <div key={id} className={b('partner-logo', { size })}>
              <ExternalLink href={url}>
                <img src={img} alt={localize(`about.${id}`, lang)} loading="lazy" />
              </ExternalLink>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  </>
);

export default AboutPage;
