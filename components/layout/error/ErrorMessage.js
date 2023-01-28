import React from 'react';
import bem from 'bem-css-modules';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Icon from 'components/common/ui/Icon';
import ExternalLink from 'components/common/ExternalLink';

import { ROUTES_NAMES } from 'routes';
import { NETWORKS } from 'constants/social';
import styles from './error.module.scss';

const b = bem(styles);

const ErrorMessage = ({ code }) => (
  <div className={b()}>
    <div className={b('title')}>
      <span className={b('code')}>{code}</span> <Text id={`errors.${code}-title`} />
    </div>
    <div className={b('subtitle')}>
      <Text id={`errors.${code}-subtitle`} />
    </div>
    <div className={b('go-to-main')}>
      <Link route={ROUTES_NAMES.main}>
        <Text id="errors.go-to-main" />
      </Link>
    </div>
    <div className={b('social-buttons')}>
      {NETWORKS.map(({ id, link, color }) => (
        <ExternalLink key={id} href={link} className={b('social-button')}>
          <Icon pack="b" name={id} style={{ color }} />
        </ExternalLink>
      ))}
    </div>
    <div className={b('contact-us')}>
      <Text id="errors.contact-us" />
      {': '}
      <ExternalLink href="mailto:wir.development@gmail.com">wir.development@gmail.com</ExternalLink>
    </div>
  </div>
);

export default ErrorMessage;
