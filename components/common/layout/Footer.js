import React from 'react';
import cn from 'classnames';
import block from 'bem-css-modules';

import Text, { useLocalization } from 'components/common/Text';
import Link from 'components/common/Link';
import ExternalLink from 'components/common/ExternalLink';
import Icon from 'components/common/ui/Icon';

import MailLink from 'components/social/MailLink';
import ShareButtons from 'components/social/ShareButtons';

import { TOPICS } from 'constants';
import { NETWORKS } from 'constants/social';
import { ROUTES_NAMES } from 'routes';
import footer from './footer/index.module.scss';
import layout from './footer/layout.module.scss';

import SubscribeForm from './footer/SubscribeForm';

const f = block(footer);
const l = block(layout);

const Footer = () => (
  <footer className={cn(f(), l())}>
    <div className={l('nested1')}>
      <div className={l('nested2')}>
        <div className={cn(f('links'), l('block1'))}>
          <div className={f('links-column')}>
            <div className={f('header')}>
              <Text id="footer.materials" />
            </div>
            {/* `themes` should be first */}
            {TOPICS.map(topic => (
              <div key={topic} className={f('item')}>
                <Link route={ROUTES_NAMES.topic} params={{ topic }}>
                  <Text id={`topic.by_${topic}`} />
                </Link>
              </div>
            ))}
          </div>
          <div className={f('links-column')}>
            <div className={f('header')}>
              <Text id="footer.our-networks" />
            </div>
            {NETWORKS.map(({ id, label, link }) => (
              <div key={id} className={f('item')}>
                <ExternalLink key={id} href={link}>
                  {label}
                </ExternalLink>
              </div>
            ))}
          </div>
        </div>

        <div className={l('block2')}>
          <div className={f('interactions')}>
            <SubscribeForm />
            <ExternalLink className={f('rss')} href="/rss">
              <Icon className={f('rss-icon')} pack="s" name="rss" />
              <Text id="footer.rss" />
            </ExternalLink>
            <div>
              <div className={f('header')}>
                <Text id="footer.share" />
              </div>
              <ShareButtons basicText={useLocalization('common.project-description')} />
            </div>
          </div>
        </div>
      </div>

      <div className={l('block3')}>
        <div className={f('help-us')}>
          <div className={f('header')}>
            <Text id="footer.help-us" />
          </div>
          <div className={f('help-text')}>
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

    <div className={f('bottom')}>
      <span className={f('copyright')}>© Wir.by, {new Date().getFullYear()}</span>
    </div>
  </footer>
);

export default Footer;
