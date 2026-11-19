import type { Metadata } from 'next';

import CardBlocksLayout from '@/components/blocks/CardBlocksLayout';
import FortuneGame from '@/components/games/FortuneGame';
import Header, { ToMainTitle } from '@/components/layout/Header';
import { NY2021 } from '@/constants';
import { getLang } from '@/lib/i18n/server';
import { getFortuneGame } from '@/lib/loaders';
import { pageMetadata } from '@/lib/metadata';
import { routes } from '@/lib/routes';
import type { Block } from '@/lib/types';

const PREVIEW_URL =
  'https://res.cloudinary.com/wir-by/image/upload/c_scale,w_1200,f_auto,q_auto/v1608977422/production/games/game-ny2021-preview.png';
const BACKGROUND_URL =
  'https://res.cloudinary.com/wir-by/image/upload/c_scale,w_1300,f_auto,q_auto/v1607867725/production/games/sto-cakaje-u-2021.png';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const { title, description } = await getFortuneGame();
  return pageMetadata({
    lang,
    title,
    description,
    image: PREVIEW_URL,
    url: routes.game(lang, NY2021),
  });
}

/** Legacy pages/game/ny2021.js. */
export default async function FortuneGamePage() {
  const lang = await getLang();
  const { title, description, suggestedArticles } = await getFortuneGame();

  return (
    <>
      <div
        className="bg-black bg-cover bg-center pb-[120px] text-white"
        style={{ backgroundImage: `url(${BACKGROUND_URL})` }}
      >
        <Header title={<ToMainTitle label="Wir.by" />} />
        <div className="flex justify-center px-[calc((100%-var(--page-width-mobile))/2)] text-body touch:px-[calc((100%-var(--page-width-touch))/2)] tablet:px-[calc((100%-var(--page-width-tablet))/2)] tablet-lg:px-[calc((100%-var(--page-width-tablet-lg))/2)] desktop:px-[calc((100%-var(--page-width-desktop))/2)]">
          <div className="flex max-w-[780px] flex-col items-center">
            <span>Прадказанне</span>
            <h1 className="mb-10 text-center text-title">{title}</h1>
            <FortuneGame title={title} description={description} />
          </div>
        </div>
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
