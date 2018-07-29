import React from 'react';

import Icon from 'components/common/Icon';
import Link from 'components/common/Link';
import Text from 'components/common/Text';
import SocialList from 'components/common/SocialList';

import { ROUTES_NAMES } from 'routes';

const Footer = () => (
  <footer className="app-footer">
    <div className="columns">
      <div className="column general-info">
        <Text id="footer.projectGeneralInfo" /> <Icon name="copyright" /> {new Date().getFullYear()}
        <br />
        <Text id="footer.projectGoal" />
        <br />
        <Text id="footer.readAboutUs" />{' '}
        <Link route={ROUTES_NAMES.about}>
          <a>
            <Text id="footer.here" />
          </a>
        </Link>
      </div>
      <div className="column social">
        <Text id="footer.followSocialLinks" />
        <SocialList className="links" rounded />
      </div>
    </div>
  </footer>
);

export default Footer;
