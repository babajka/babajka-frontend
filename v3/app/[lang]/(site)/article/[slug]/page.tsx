import type { Metadata } from 'next';

import CollectionNote from '@/components/article/CollectionNote';
import CardBlocksLayout from '@/components/blocks/CardBlocksLayout';
import { TagNameLink, TagNameLinks } from '@/components/blocks/TopicLink';
import { AudioButtons, VideoPlayer } from '@/components/fibery/players';
import { ExCoQuiz } from '@/components/fibery/quizzes';
import FiberyContent from '@/components/fibery/renderer';
import ShareButtons from '@/components/social/ShareButtons';
import TagImage from '@/components/TagImage';
import { renderTag, TagLink } from '@/components/tags';
import TextWithSeparator from '@/components/TextWithSeparator';
import Image from '@/components/ui/Image';
import { getLang } from '@/lib/i18n/server';
import { getArticles, getLocalizedArticlePage } from '@/lib/loaders';
import { pageMetadata } from '@/lib/metadata';
import { orNotFound } from '@/lib/request';
import { routes } from '@/lib/routes';
import { DEFAULT_IMAGE } from '@/lib/site';
import type { Block } from '@/lib/types';
import type { FiberyNode } from '@/utils/fibery/toString';
import type { LocalizedArticle, LocalizedTag } from '@/utils/getters';

// Waits for the article, like legacy SSR: without it the page has no useful content to show.
export const instant = false;

const COVER_SIZES = [1200, 1000, 770, 640, 360];

const SLUG_TO_EXCO_QUIZ_ID: Record<string, string> = {
  bielaruski: 'a8822357-22c3-4090-bfe6-765948466bbe',
  'karatkiewich-test': 'd97b130c-8088-4183-aaf4-a1af49b4e814',
  'kupala-test': '27c28c25-f228-460b-8c69-cdfee9fe08f5',
};

/** The fields of a backend article that the page reads. */
type ArticleFields = {
  slug: string;
  title: string;
  subtitle: string;
  keywords?: string;
  type: 'text' | 'audio' | 'video';
  images: { page?: string; horizontal?: string };
  audio?: { id?: string; episodeIds?: Record<string, string | undefined> } | null;
  video?: { id: string } | null;
};

const getFields = (article: LocalizedArticle) => article as unknown as ArticleFields;

const getTags = ({ tagsByTopic }: LocalizedArticle) => {
  const {
    brands = [],
    authors = [],
    ...others
  } = (tagsByTopic ?? {}) as Record<string, LocalizedTag[]>;
  return { brands, authors, tags: Object.values(others).flat() };
};

const getPage = async ({ params }: PageProps<'/[lang]/article/[slug]'>) => {
  const { slug } = await params;
  const lang = await getLang();
  return orNotFound(getLocalizedArticlePage(decodeURIComponent(slug), lang));
};

/** The newest articles are prerendered, the others are rendered and cached on the first visit. */
export async function generateStaticParams() {
  const { data } = await getArticles({ take: 12 });
  return data.flatMap(({ locales }) =>
    Object.values(locales).flatMap(locale => (locale ? [{ slug: locale.slug }] : []))
  );
}

export async function generateMetadata(
  props: PageProps<'/[lang]/article/[slug]'>
): Promise<Metadata> {
  const lang = await getLang();
  const { article } = await getPage(props);
  const { slug, title, subtitle, keywords, images } = getFields(article);
  const { authors, tags } = getTags(article);

  return pageMetadata({
    lang,
    title,
    description: subtitle,
    keywords,
    image: images.page || images.horizontal || DEFAULT_IMAGE,
    url: routes.article(lang, slug),
    article: {
      authors: authors.map(tag => String(renderTag(tag))),
      tags: tags.map(tag => String(renderTag(tag))),
      publishedTime: article.publishAt,
    },
  });
}

export default async function ArticlePage(props: PageProps<'/[lang]/article/[slug]'>) {
  const lang = await getLang();
  const { article, locale } = await getPage(props);
  const { slug, title, subtitle, type, images, audio, video } = getFields(article);
  const { brands, authors, tags } = getTags(article);
  const { collection, suggestedArticles } = article;
  const quizId = SLUG_TO_EXCO_QUIZ_ID[slug];
  const youtubeId = audio?.episodeIds?.youtubepodcasts;

  return (
    <>
      <div>
        <div className="content-padding text-body">
          <div className="mt-2.5 touch:mt-3 tablet:mt-[15px] tablet-lg:mt-5">
            <TextWithSeparator text={subtitle} symbol={'\n'} />
          </div>
        </div>
        {type === 'text' && images.page && (
          <Image
            className="mt-[30px] w-full object-cover object-[50%_0] tablet:mt-10 tablet-lg:mt-[50px] desktop:mt-[60px]"
            alt={title}
            widths={COVER_SIZES}
            baseUrl={images.page}
            inViewport
          />
        )}
      </div>

      <div className="mt-[30px] mb-[30px] content-padding touch:mt-10 tablet:mt-[50px] tablet-lg:mt-[60px] desktop:mt-[72px]">
        {(!!brands.length || !!authors.length) && (
          <div className="mb-6 flex flex-row items-center">
            {[...brands, ...authors].map(tag => (
              <TagLink
                key={String(tag.slug)}
                className="not-first:ml-3 hover:opacity-75"
                lang={lang}
                topic={tag.topicSlug}
                tag={String(tag.slug)}
              >
                <TagImage tag={tag} className="h-12 rounded-[2px]" inViewport />
              </TagLink>
            ))}
            <div className="ml-3 flex flex-col leading-6 text-primary">
              <span>
                <TagNameLinks lang={lang} tags={brands} />
                {!!brands.length && !!authors.length && ','}
              </span>
              <span>
                <TagNameLinks lang={lang} tags={authors} />
              </span>
            </div>
          </div>
        )}
        <h1 className="text-title">{title}</h1>
      </div>

      <div className="content-padding">
        <div className="overflow-auto">
          {type === 'audio' && youtubeId && <VideoPlayer videoId={youtubeId} />}
          {type === 'audio' && (
            <AudioButtons
              trackIds={{
                ...audio?.episodeIds,
                yandexmusic: audio?.episodeIds?.yandexmusic || audio?.id,
              }}
            />
          )}
          {type === 'video' && video && <VideoPlayer videoId={video.id} />}

          {collection?.articles && collection.articles.length > 1 && (
            <CollectionNote collection={collection} lang={lang} locale={locale} />
          )}

          <div className="text-body">
            <FiberyContent content={(article.text as { content?: FiberyNode[] }).content} />
          </div>

          {quizId && <ExCoQuiz key={quizId} id={quizId} />}

          <div className="mt-[72px] flex flex-col desktop:flex-row">
            <ShareButtons basicText={title} />
          </div>
          <div className="mt-[72px] flex flex-row flex-wrap leading-6 touch:leading-[30px] tablet-lg:leading-[33px] desktop:leading-[1.15]">
            {tags.map(tag => (
              <div key={String(tag.slug)} className="not-last:mr-3">
                <TagNameLink lang={lang} tag={tag} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {suggestedArticles && (
        <div>
          <CardBlocksLayout
            blocks={suggestedArticles.blocks as Block[]}
            data={suggestedArticles.data}
            lang={lang}
          />
        </div>
      )}
    </>
  );
}
