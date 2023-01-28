import React from 'react';
import cn from 'classnames';
import bem from 'bem-css-modules';

// import { CROWDFUNDING_CAMPAIGN } from 'constants/misc';

import Text, { useLocalization } from 'components/common/Text';
import ExternalLink from 'components/common/ExternalLink';
import Icon from 'components/common/ui/Icon';
// import MolamolaIcon from 'components/common/ui/MolamolaIcon';

import ShareButtons from 'components/social/ShareButtons';

import { NETWORKS, PODCASTS_PLATFORMS } from 'constants/social';
import footer from './footer/index.module.scss';
import layout from './footer/layout.module.scss';

import SubscribeForm from './footer/SubscribeForm';

const f = bem(footer);
const l = bem(layout);

const Footer = () => (
  <footer className={cn(f(), l())}>
    <div className={l('nested1')}>
      <div className={l('nested2')}>
        <div className={cn(f('links'), l('block1'))}>
          {/* <div className={f('links-column')}>
            <div className={f('header')}>
              <Text id="footer.materials" />
            </div>
            // `themes` should be first
            {TOPICS.map(topic => (
              <div key={topic} className={f('item')}>
                <Link route={ROUTES_NAMES.topic} params={{ topic }}>
                  <Text id={`topic.by_${topic}`} />
                </Link>
              </div>
            ))}
          </div> */}
          <div className={f('links-column')}>
            <div className={f('header')}>
              <Text id="footer.our-networks" />
            </div>
            {NETWORKS.map(({ id, label, link }) => (
              <div key={id} className={f('item')}>
                <ExternalLink href={link}>{label}</ExternalLink>
              </div>
            ))}
          </div>
          <div className={f('links-column')}>
            <div className={f('header')}>
              <Text id="footer.listen-us" />
            </div>
            {PODCASTS_PLATFORMS.map(({ id, label, link }) => (
              <div key={id} className={f('item')}>
                <ExternalLink href={link}>{label}</ExternalLink>
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
              <ShareButtons
                className={l('share')}
                basicText={useLocalization('common.project-description')}
                noAsPath
              />
            </div>
          </div>
        </div>
      </div>

      <div className={l('block3')}>
        <div className={f('help-us')}>
          <div className={f('header', { 'padding-bottom': 'small' })}>
            <Text id="footer.help-us" />
          </div>
          <div className={f('help-text')}>
            <Text
              id="footer.contact-us"
              render={(text, link) => (
                <>
                  {text}
                  <ExternalLink href="mailto:wir.help@gmail.com">{link}</ExternalLink>
                </>
              )}
            />
          </div>
        </div>
        {/* {CROWDFUNDING_CAMPAIGN.enabled && (
          <div className={f('help-us')}>
            <div className={f('header', { 'padding-bottom': 'small' })}>
              <Text id="footer.support-financially" />
            </div>
            <div className={f('help-text')}>
              <ExternalLink href={CROWDFUNDING_CAMPAIGN.options.link}>
                <Text id="footer.wir-on" />
                <span>&nbsp;&nbsp;</span>
                <MolamolaIcon />
              </ExternalLink>
            </div>
          </div>
        )} */}
      </div>
    </div>

    <div className={f('bottom')}>
      <span className={f('copyright')}>
        © Wir.by, {new Date().getFullYear()}. <Text id="footer.copyright" />
      </span>
    </div>
  </footer>
);

export default Footer;
