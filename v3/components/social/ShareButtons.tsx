'use client';

import { useState } from 'react';

import { ExternalLinkAltIcon } from '@/components/icons';
import Button from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import { DOMAIN_SECURE } from '@/constants';
import { SHARE_NETWORKS } from '@/constants/social';
import { useT } from '@/lib/i18n/client';
import { cn } from '@/lib/utils/cn';

const POPUP_WINDOW_PARAMS = 'width=600,height=400';

const COLOR: Record<(typeof SHARE_NETWORKS)[number]['id'], string> = {
  facebook: 'text-facebook',
  vk: 'text-vk',
  twitter: 'text-twitter',
  // It isn't clear how to share to Telegram on mobile (it doesn't work on iOS at least), so the
  // button is hidden below 650px, like legacy.
  telegram: 'text-telegram max-tablet:hidden',
  odnoklassniki: 'text-odnoklassniki',
};

type ShareButtonsProps = {
  className?: string;
  /** Share the site root instead of the current page (footer). */
  noAsPath?: boolean;
  basicText: string;
  /** Longer text for Twitter. */
  extendedText?: string;
  url?: string;
};

/**
 * Legacy components/social/ShareButtons.js. Below 650px: one "share" button with the native share
 * sheet (falls back to the network buttons). From 650px: a group of network buttons.
 */
const ShareButtons = ({
  className,
  noAsPath,
  basicText,
  extendedText,
  url: forceUrl,
}: ShareButtonsProps) => {
  const t = useT();
  const [forceButtonGroup, setForceButtonGroup] = useState(false);
  // Read at click time: reading the pathname during render would make every page dynamic.
  const getUrl = () => forceUrl || `${DOMAIN_SECURE}${noAsPath ? '' : window.location.pathname}`;

  return (
    <>
      <div className={cn('tablet:hidden', forceButtonGroup && 'hidden', className)}>
        <Button
          icon={ExternalLinkAltIcon}
          onClick={() => {
            if (navigator.share) {
              navigator.share({ text: basicText, url: getUrl() }).catch(() => {});
            } else {
              setForceButtonGroup(true);
            }
          }}
        >
          {t('common.share-link')}
        </Button>
      </div>
      <div className={cn('hidden w-[300px] tablet:block', forceButtonGroup && 'block', className)}>
        <ButtonGroup icon>
          {SHARE_NETWORKS.map(({ id, Icon, baseUrl, getParams }) => {
            const text = id === 'twitter' ? extendedText || basicText : basicText;
            const label = t(`common.share-${id}`);
            return (
              <button
                key={id}
                type="button"
                title={label}
                aria-label={label}
                className={cn('w-2 px-0 py-2.5 text-[22px] leading-6', COLOR[id])}
                onClick={() => {
                  const params = new URLSearchParams(getParams(getUrl(), text));
                  window.open(`${baseUrl}?${params}`, t('common.share-link'), POPUP_WINDOW_PARAMS);
                }}
              >
                <Icon />
              </button>
            );
          })}
        </ButtonGroup>
      </div>
    </>
  );
};

export default ShareButtons;
