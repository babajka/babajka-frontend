import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';

import { TwoArticlesInRow } from '@/components/blocks/ArticleBlocks';
import { DiaryLinkArrows, LiveDiaryLinkArrows } from '@/components/diary/DiaryLinkArrows';
import { DiaryShare, LiveDiaryShare } from '@/components/diary/DiaryShare';
import FiberyContent from '@/components/fibery/renderer';
import Image from '@/components/ui/Image';
import type { Lang } from '@/constants';
import { getLang, getT } from '@/lib/i18n/server';
import { getDiaryPage } from '@/lib/loaders';
import { pageMetadata } from '@/lib/metadata';
import { orNotFound } from '@/lib/request';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils/cn';
import { DATE_FORMAT, formatLocalizedDate, SHORT_DATE_FORMAT } from '@/utils/date';
import { getMinskDay } from '@/utils/diary';
import { fiberyToString, type FiberyNode } from '@/utils/fibery/toString';

// Waits for the entry, like legacy SSR: without it the page has no useful content to show.
export const instant = false;

/** One entry validates the route at build time; the others are cached on the first visit. */
export const generateStaticParams = () => [{ slug: ['f31126'] }];

type Props = PageProps<'/[lang]/diary/[[...slug]]'>;

/** `/diary` goes to the canonical URL of today's entry. */
const redirectToToday = async (lang: Lang): Promise<never> => {
  await connection();
  const page = await orNotFound(getDiaryPage(getMinskDay(new Date()), lang));
  redirect(routes.diary(lang, page.data.slug));
};

const getPage = async ({ params }: Props) => {
  const { slug: segments = [] } = await params;
  const lang = await getLang();
  if (segments.length > 1) {
    notFound();
  }
  const [slug] = segments;
  if (!slug) {
    return redirectToToday(lang);
  }
  return { lang, ...(await orNotFound(getDiaryPage({ slug: decodeURIComponent(slug) }, lang))) };
};

const SHORT_CONTENT_LENGTH = 140;

const getContent = (text?: { content?: unknown }) => text?.content as FiberyNode[] | undefined;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { lang, diary } = await getPage(props);
  const t = await getT(lang);
  const { slug, date, text, author } = diary;
  const { name, diaryImage } = author;
  const shortContent = fiberyToString(getContent(text)).substring(0, SHORT_CONTENT_LENGTH);

  return pageMetadata({
    lang,
    title: `${formatLocalizedDate(date, lang, DATE_FORMAT)}, ${name}`,
    description: `${shortContent}...`,
    keywords: [
      formatLocalizedDate(date, lang, SHORT_DATE_FORMAT),
      name,
      t('diary.meta-keywords'),
    ].join(', '),
    image: diaryImage,
    smallImage: true,
    url: routes.diary(lang, slug),
    article: { authors: [], tags: [] },
  });
}

/** Legacy pages/diary.js. */
export default async function DiaryPage(props: Props) {
  const { lang, diary, data, prev, next, articles } = await getPage(props);
  const t = await getT(lang);
  const { date, text, author } = diary;
  const { name, diaryImage: image } = author;
  const arrows = { lang, prev, next };
  const share = {
    date,
    name,
    lang,
    wrote: t('diary.wrote'),
    content: fiberyToString(getContent(text)).substring(0, SHORT_CONTENT_LENGTH),
  };
  const [first, second] = articles;

  return (
    <>
      <div className="flex flex-col content-padding">
        <Suspense fallback={<DiaryLinkArrows {...arrows} isNextAvailable={false} />}>
          <LiveDiaryLinkArrows {...arrows} entry={data} />
        </Suspense>
        <div
          className={cn(
            'mt-5 flex flex-col text-[30px] leading-9 font-bold touch:text-4xl touch:leading-[48px] tablet:text-[42px] tablet:leading-[54px] tablet-lg:text-5xl tablet-lg:leading-[60px]',
            image && 'touch:max-w-[350px] tablet:max-w-[400px] tablet-lg:max-w-[800px]'
          )}
        >
          <h1>{formatLocalizedDate(date, lang, DATE_FORMAT)}</h1>
          <h1>{name}</h1>
        </div>
        <div className={cn('mb-10 w-full border-b border-concrete', !image && 'mt-10')}>
          {image && (
            <Image
              className="float-right w-[115px] touch:-mt-[100px] tablet:-mt-[125px] tablet:w-[170px]"
              alt={name ?? ''}
              size={180}
              baseUrl={image}
              inViewport
            />
          )}
        </div>
        <div className="px-[3px] font-serif text-xl leading-9 italic">
          <FiberyContent content={getContent(text)} />
        </div>
        <div className="my-10">
          <Suspense fallback={<DiaryShare {...share} />}>
            <LiveDiaryShare {...share} entry={data} />
          </Suspense>
        </div>
        <Suspense
          fallback={<DiaryLinkArrows {...arrows} className="my-5" isNextAvailable={false} />}
        >
          <LiveDiaryLinkArrows {...arrows} className="my-5" entry={data} />
        </Suspense>
      </div>

      {!!articles.length && (
        <TwoArticlesInRow className="pt-4 pb-32" first={first} second={second} lang={lang} />
      )}
    </>
  );
}
