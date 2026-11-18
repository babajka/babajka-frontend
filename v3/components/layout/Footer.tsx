import type { ReactNode } from 'react';

import { RssIcon } from '@/components/icons';
import ShareButtons from '@/components/social/ShareButtons';
import ExternalLink from '@/components/ui/ExternalLink';
import { NETWORKS, PODCASTS_PLATFORMS } from '@/constants/social';
import { getT, Text } from '@/lib/i18n/server';
import { HELP_EMAIL, RSS_URL } from '@/lib/site';
import { cn } from '@/lib/utils/cn';

import CurrentYear from './CurrentYear';
import SubscribeForm from './SubscribeForm';

// Legacy components/layout/Footer.js + footer/index.module.scss (.footer) and
// footer/layout.module.scss (.footer-layout). Breakpoints: legacy `touch` mixin = ≥650px (`tablet:`),
// `desktop` = ≥1100px; one custom 720px step is kept as is.

const Heading = ({ children, small }: { children: ReactNode; small?: boolean }) => (
  <div className={cn('pt-2 pb-4 text-[1.1rem] font-bold text-black', small && 'pb-1')}>
    {children}
  </div>
);

const LinksColumn = ({
  title,
  links,
}: {
  title: ReactNode;
  links: readonly { id: string; label: string; link: string }[];
}) => (
  <div className="flex grow flex-col pr-3">
    <Heading>{title}</Heading>
    {links.map(({ id, label, link }) => (
      <div key={id} className="py-2">
        <ExternalLink href={link}>{label}</ExternalLink>
      </div>
    ))}
  </div>
);

const Footer = async () => {
  const t = await getT();

  return (
    <footer className="mx-4 mt-20 mr-8 mb-4 box-border flex flex-col border-t border-grey pt-8 text-base tablet:mx-12 tablet:my-12 tablet:mr-24">
      <div className="flex flex-col desktop:flex-row">
        <div className="flex flex-col min-[720px]:flex-row desktop:flex-[5]">
          <div className="flex flex-row pb-4 tablet:flex-1">
            <LinksColumn title={<Text id="footer.our-networks" />} links={NETWORKS} />
            <LinksColumn title={<Text id="footer.listen-us" />} links={PODCASTS_PLATFORMS} />
          </div>

          <div className="tablet:flex-1">
            <div className="flex flex-col items-stretch py-4 tablet:p-0 desktop:px-8">
              <SubscribeForm />
              <ExternalLink className="pt-2.5 pb-5" href={RSS_URL}>
                <RssIcon className="mr-[5px]" />
                <Text id="footer.rss" />
              </ExternalLink>
              <div>
                <Heading>
                  <Text id="footer.share" />
                </Heading>
                <ShareButtons
                  className="w-full"
                  basicText={t('common.project-description')}
                  noAsPath
                />
              </div>
            </div>
          </div>
        </div>

        <div className="desktop:flex desktop:flex-[2] desktop:flex-col desktop:justify-between">
          <div className="py-2 desktop:px-8 desktop:py-0">
            <Heading small>
              <Text id="footer.help-us" />
            </Heading>
            <div className="pb-2 leading-[1.7em]">
              <Text
                id="footer.contact-us"
                render={(text, link) => (
                  <>
                    {text}
                    <ExternalLink href={`mailto:${HELP_EMAIL}`}>{link}</ExternalLink>
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 pb-[60px] tablet:pb-20 tablet-lg:pt-[35px] desktop:pt-[75px]">
        <span className="mr-4 text-base leading-6">
          © Wir.by, <CurrentYear />. <Text id="footer.copyright" />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
