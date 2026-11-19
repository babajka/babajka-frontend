import type { Metadata } from 'next';

import CardBlocksLayout from '@/components/blocks/CardBlocksLayout';
import FiberyContent from '@/components/fibery/renderer';
import TinderGame from '@/components/games/TinderGame';
import Header, { ToMainTitle } from '@/components/layout/Header';
import { getLang } from '@/lib/i18n/server';
import { getTinderGame } from '@/lib/loaders';
import { pageMetadata } from '@/lib/metadata';
import { routes } from '@/lib/routes';
import type { Block } from '@/lib/types';

const PREVIEW_URL =
  'https://res.cloudinary.com/wir-by/image/upload/c_scale,w_1200,f_auto,q_auto/v1613152867/production/games/game-tinder-preview.png';
const WHITE = '#ffffff';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const { title, subtitle } = await getTinderGame();
  return pageMetadata({
    lang,
    title,
    description: subtitle,
    image: PREVIEW_URL,
    url: routes.game(lang, 'tinder'),
  });
}

/** Legacy pages/game/tinder.js. */
export default async function TinderGamePage() {
  const lang = await getLang();
  const { title, people, suggestedArticles } = await getTinderGame();

  return (
    <>
      <div className="bg-[linear-gradient(250.2deg,var(--color-tinder-from)_0%,var(--color-tinder-to)_100%)] pb-[90px]">
        <Header title={<ToMainTitle label="Wir.by" color={WHITE} />} color={WHITE} />
        <TinderGame
          title={title}
          profiles={people.map(person => ({
            id: person.personStatsId,
            nickname: person.nickname,
            photoUrl: `${person.photoUrl}?mode=raw`,
            description: <FiberyContent content={person.description.content} />,
            acceptMessage: <FiberyContent content={person.acceptMessage.content} />,
          }))}
        />
      </div>
      {suggestedArticles && (
        <CardBlocksLayout
          blocks={suggestedArticles.blocks as Block[]}
          data={suggestedArticles.data}
          lang={lang}
        />
      )}
    </>
  );
}
