import React from 'react';

import Icon from 'components/common/Icon';
import Link from 'components/common/Link';
import ExternalLink from 'components/common/ExternalLink';

import { ROUTES_NAMES } from 'routes';
import { NETWORKS } from 'constants/social';
import text from 'constants/dictionary';

const Footer = () => (
  <footer className="app-footer">
    <div className="columns">
      <div className="column general-info">
        {text.projectGeneralInfo} <Icon name="copyright" /> {new Date().getFullYear()}
        <br />
        {text.projectGoal}
        <br />
        {text.readAboutUs}
        <Link route={ROUTES_NAMES.about}>
          <a>{text.here}</a>
        </Link>
      </div>
      <div className="column social">
        <div>{text.followSocialLinks}</div>
        <div className="links">
          {NETWORKS.map(({ name, link }) => (
            <ExternalLink key={name} href={link} className={`button is-medium is-rounded ${name}`}>
              <span className="icon is-medium">
                <Icon name={name} />
              </span>
            </ExternalLink>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
