'use client';

import { useState } from 'react';

import ShareButtons from '@/components/social/ShareButtons';
import { renderTag, TagLink } from '@/components/tags';
import TextWithSeparator from '@/components/TextWithSeparator';
import Button from '@/components/ui/Button';
import { NY2021 } from '@/constants';
import { api } from '@/lib/api';
import { useLang } from '@/lib/i18n/client';
import type { FortuneCookie } from '@/lib/types';
import { fiberyToString } from '@/utils/fibery/toString';
import { getLocalizedTag } from '@/utils/getters';

// The game exists in Belarusian only.
const GAME_LANG = 'be';

const loadCookie = async () => {
  const response = await fetch(api.games.fortune.getCookie(NY2021));
  if (!response.ok) {
    throw new Error(`Fortune request failed with ${response.status}`);
  }
  return (await response.json()) as FortuneCookie;
};

/** Legacy pages/game/ny2021.js: the part that changes on click. */
const FortuneGame = ({ title, description }: { title: string; description: string }) => {
  const lang = useLang();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [cookie, setCookie] = useState<FortuneCookie | null>(null);

  const fetchCookie = async () => {
    setPending(true);
    setError(false);
    try {
      setCookie(await loadCookie());
    } catch (err) {
      console.error(err);
      setCookie(null);
      setError(true);
    } finally {
      setPending(false);
    }
  };

  const text = fiberyToString(cookie?.text?.content, { useBreak: true });
  const authorTag = cookie?.authorTag && getLocalizedTag(cookie.authorTag, GAME_LANG);

  return (
    <>
      <div className="flex min-h-[256px] flex-col justify-center text-center">
        {cookie ? (
          <>
            <span className="text-2xl leading-[31.2px] touch:text-[27px] touch:leading-[39px] tablet-lg:text-[30px] tablet-lg:leading-[42.9px] desktop:leading-[48px]">
              <TextWithSeparator text={text} symbol={'\n'} />
            </span>
            <div className="mt-7">
              {authorTag ? (
                <TagLink
                  lang={lang}
                  topic={authorTag.topicSlug}
                  tag={String(authorTag.slug)}
                  dark
                  target="_blank"
                >
                  {renderTag(authorTag)}
                </TagLink>
              ) : (
                <span className="font-serif italic opacity-50">{cookie.author}</span>
              )}
            </div>
          </>
        ) : (
          <span>{description}</span>
        )}
      </div>
      <Button
        className="mt-10 block border-0 bg-caribbean text-white hover:text-white"
        onClick={fetchCookie}
        disabled={pending}
      >
        {error ? 'Памылка, паспрабуйце яшчэ' : `Атрымаць${cookie ? ' яшчэ адно' : ''}`}
      </Button>
      <ShareButtons className="mt-[60px]" basicText={`${title}\n\n${text}`} />
    </>
  );
};

export default FortuneGame;
