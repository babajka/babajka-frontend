import React from 'react';

import Text from 'components/common/Text';
import Link from 'components/common/Link';
import ExternalLink from 'components/common/ExternalLink';
import Input from 'components/common/ui/Input';

import MailLink from 'components/social/MailLink';
import ShareButtons from 'components/social/ShareButtons';

import { TOPICS } from 'constants/home';
import { NETWORKS } from 'constants/social';

import 'styles/src/footer/footer.scss';

const Footer = () => (
  <footer className="footer footer-layout">
    <div className="footer-layout__nested1">
      <div className="footer-layout__nested2">
        <div className="footer-layout__block1 footer__links">
          <div className="footer__links-column">
            <div className="footer__header">
              <Text id="footer.materials" />
            </div>
            {TOPICS.map(topic => (
              <div key={topic} className="footer__item">
                <Link>
                  <Text id={`topic.by_${topic}`} />
                </Link>
              </div>
            ))}
          </div>
          <div className="footer__links-column">
            <div className="footer__header">
              <Text id="footer.our-networks" />
            </div>
            {NETWORKS.map(({ id, label, link }) => (
              <div key={id} className="footer__item">
                <ExternalLink key={id} href={link}>
                  {label}
                </ExternalLink>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-layout__block2">
          <div className="footer__interactions">
            <div className="footer__mailing">
              <div className="footer__header">
                <Text id="footer.subscribe" />
              </div>
              <Input leftIcon={{ name: 'envelope', pack: 'r' }} />
            </div>
            <div className="footer__social">
              <div className="footer__header">
                <Text id="footer.share" />
              </div>
              <ShareButtons />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-layout__block3">
        <div className="footer__help-us">
          <div className="footer__header">
            <Text id="footer.help-us" />
          </div>
          <div className="footer__help-text">
            <Text
              id="footer.contact-us"
              render={(text, link) => (
                <>
                  {text}
                  <MailLink>{link}</MailLink>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>

    <div className="footer-layout__block4 footer__bottom">
      <span className="footer__copyright">© Wir.by, {new Date().getFullYear()}</span>
    </div>
  </footer>
);

export default Footer;
