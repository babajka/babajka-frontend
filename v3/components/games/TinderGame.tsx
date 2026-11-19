'use client';

import { useState, useSyncExternalStore, type ReactNode } from 'react';

import { HeartIcon, TimesIcon } from '@/components/icons';
import ShareButtons from '@/components/social/ShareButtons';
import Button from '@/components/ui/Button';
import { TINDER_SLUG } from '@/constants';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils/cn';

const SHARE_URL = 'https://tinder.wir.by';
const SHARE_TEXT = 'Знайдзі сабе пару на: ';
const MATCH_IMAGE_URL =
  'https://res.cloudinary.com/wir-by/image/upload/c_scale,w_457,f_auto,q_auto/v1612824869/production/games/game-tinder-match.png';
const MATCH_CHANCE = 0.7;
const MATCH_LABEL = 'It’s a match!';

export type TinderProfile = {
  id: string;
  nickname: string;
  photoUrl: string;
  description: ReactNode;
  acceptMessage: ReactNode;
};

const postStats = (action: 'like' | 'dislike', personId: string) =>
  fetch(api.games.tinder.postStats, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ slug: TINDER_SLUG, action, personId }),
    keepalive: true,
  }).catch(console.error);

const shuffle = <T,>(items: T[]) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const SHUFFLED = new WeakMap<TinderProfile[], TinderProfile[]>();

const getShuffled = (profiles: TinderProfile[]) => {
  const cached = SHUFFLED.get(profiles) ?? shuffle(profiles);
  SHUFFLED.set(profiles, cached);
  return cached;
};

const subscribe = () => () => {};

const ROUND_BUTTON =
  'flex size-[60px] items-center justify-center rounded-full border-0 p-0 text-[30px] leading-9 font-normal text-white hover:text-white hover:brightness-95';

const ACTION_BUTTON = 'border-0 bg-caribbean text-white hover:text-white';

const SharePair = ({ className }: { className: string }) => (
  <ShareButtons className={className} basicText={SHARE_TEXT} url={SHARE_URL} />
);

type TinderGameProps = { title: string; profiles: TinderProfile[] };

/** Legacy pages/game/tinder.js. Profiles are shuffled once per visit, after hydration. */
const TinderGame = ({ title, profiles: initialProfiles }: TinderGameProps) => {
  const profiles = useSyncExternalStore(
    subscribe,
    () => getShuffled(initialProfiles),
    () => initialProfiles
  );
  const [index, setIndex] = useState(0);
  const [isMatch, setIsMatch] = useState(false);

  const profile = profiles[index];
  const nextProfile = profiles[index + 1];
  const profilesLeft = profiles.length - index;

  const showNext = () => setIndex(index + 1);

  const dislike = () => {
    postStats('dislike', profile.id);
    showNext();
  };

  const like = () => {
    postStats('like', profile.id);
    if (Math.random() < MATCH_CHANCE) {
      setIsMatch(true);
    } else {
      showNext();
    }
  };

  const closeMatch = () => {
    setIsMatch(false);
    showNext();
  };

  return (
    <>
      {nextProfile && <link rel="prefetch" href={nextProfile.photoUrl} />}
      <div className="flex flex-col items-center px-[18px] pt-3.5 touch:px-20 tablet:block tablet:px-[60px]">
        {profile ? (
          <div className="relative flex w-full max-w-full flex-col overflow-hidden rounded-[10px] tablet:h-[345px] tablet:w-[612px] tablet:flex-row tablet-lg:h-[419px] tablet-lg:w-[816px] desktop:h-[450px] desktop:w-[840px]">
            <div className="relative flex h-[405px] min-h-[405px] w-full max-w-[40%] min-w-full justify-center overflow-hidden touch:h-[384px] touch:min-h-[384px] tablet:h-auto tablet:min-h-0 tablet:w-auto tablet:min-w-[276px] tablet-lg:min-w-[336px] desktop:min-w-[360px]">
              {/* eslint-disable-next-line @next/next/no-img-element -- the original photo */}
              <img className="w-full object-cover" alt={profile.nickname} src={profile.photoUrl} />
              <div className="absolute bottom-0 left-0 flex w-full justify-between p-3 tablet:w-auto tablet:justify-start">
                <Button
                  className={cn(ROUND_BUTTON, 'bg-tinder')}
                  aria-label="Не падабаецца"
                  onClick={dislike}
                >
                  <TimesIcon />
                </Button>
                <Button
                  className={cn(ROUND_BUTTON, 'ml-3 bg-primary')}
                  aria-label="Падабаецца"
                  onClick={like}
                >
                  <HeartIcon />
                </Button>
              </div>
            </div>
            <div className="w-full bg-white px-2 py-5 text-center tablet:px-[60px] tablet:text-left">
              <div className="text-[30px] leading-9 font-bold tablet-lg:text-5xl tablet-lg:leading-[60px] desktop:text-[60px] desktop:leading-[66px]">
                {profile.nickname}
              </div>
              <div className="mt-[18px] text-base leading-6 desktop:mt-[30px]">
                {profile.description}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-white">
            <h1 className="text-title">{title}</h1>
            <div className="mt-7">Вы праглядзелі ўсе профілі</div>
          </div>
        )}
        <SharePair className="mt-[60px]" />
      </div>

      {isMatch && profile && (
        <>
          <div className="fixed inset-0 z-[600] bg-black opacity-90" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={MATCH_LABEL}
            className="fixed inset-0 z-[700] flex flex-col items-center overflow-y-scroll overscroll-contain text-base leading-6"
            onKeyDown={event => event.key === 'Escape' && closeMatch()}
          >
            <div className="mt-7 mb-5 flex shrink-0 flex-col items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- a fixed image from a CDN */}
              <img className="w-[456px] max-w-full" alt={MATCH_LABEL} src={MATCH_IMAGE_URL} />
              {/* eslint-disable-next-line @next/next/no-img-element -- the original photo */}
              <img
                className="z-[500] mt-6 size-[90px] rounded-full"
                alt={profile.nickname}
                src={profile.photoUrl}
              />
              <div className="relative mx-3 mt-8 flex max-w-[500px] flex-col items-center rounded-[28px] bg-white px-4 pt-11 pb-5 after:absolute after:top-[-19px] after:right-[calc(50%-20px)] after:border-x-[20px] after:border-b-[20px] after:border-x-transparent after:border-b-white after:content-['']">
                <div className="px-7">{profile.acceptMessage}</div>
                <SharePair className="mt-9" />
              </div>
              <Button
                className={cn(ACTION_BUTTON, 'mx-3 mt-[60px] px-6 py-2 text-xl leading-9')}
                // The popup takes the focus, so the keyboard can close it right away.
                ref={button => button?.focus({ preventScroll: true })}
                onClick={closeMatch}
              >
                {profilesLeft > 1 ? 'Добра, хачу іншых паглядзець' : 'Дзякуй!'}
              </Button>
              <span className="mt-7 text-white">
                {profilesLeft > 1 ? `Можна палайкаць яшчэ ${profilesLeft - 1}` : 'Лайкі скончыліся'}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TinderGame;
