import './error.scss';

import React from 'react';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Icon from 'components/common/ui/Icon';
import ExternalLink from 'components/common/ExternalLink';

import { ROUTES_NAMES } from 'routes';
import { NETWORKS } from 'constants/social';

export default ({ code }) => (
  <div className="error-message">
    <div className="error-message__title">
      <span className="error-message__code">{code}</span> <Text id={`errors.${code}-title`} />
    </div>
    <div className="error-message__subtitle">
      <Text id={`errors.${code}-subtitle`} />
    </div>
    <div className="error-message__go-to-main">
      <Link route={ROUTES_NAMES.main}>
        <Text id="errors.go-to-main" />
      </Link>
    </div>
    <div className="error-message__social-buttons">
      {NETWORKS.map(({ id, link, color }) => (
        <ExternalLink key={id} href={link} className="error-message__social-button">
          <Icon pack="b" name={id} style={{ color }} />
        </ExternalLink>
      ))}
    </div>
    <div className="error-message__contact-us">
      <Text id="errors.contact-us" />
      <span>: </span>
      <ExternalLink href="mailto:dev@wir.by">dev@wir.by</ExternalLink>
    </div>
  </div>
);
