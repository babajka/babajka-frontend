import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticlesList } from '@/components/blocks/ArticlesList';
import { TopicLink } from '@/components/blocks/TopicLink';
import { getTagImageUrl } from '@/components/TagImage';
import { renderTag } from '@/components/tags';
import { isKnownTopic } from '@/constants';
import { getLang, getT } from '@/lib/i18n/server';
import { getTagPage } from '@/lib/loaders';
import { pageMetadata } from '@/lib/metadata';
import { orNotFound } from '@/lib/request';
import { routes } from '@/lib/routes';

// Waits for the tag, like legacy SSR: without it the page has no useful content to show.
export const instant = false;

/** One tag validates the route at build time; the others are cached on the first visit. */
export const generateStaticParams = () => [{ topic: 'personalities', tag: 'kupala' }];

type Props = PageProps<'/[lang]/topic/[topic]/tag/[tag]'>;

const getPage = async ({ params }: Props) => {
  const { topic, tag } = await params;
  if (!isKnownTopic(topic)) {
    notFound();
  }
  const lang = await getLang();
  return { topic, lang, ...(await orNotFound(getTagPage(decodeURIComponent(tag), lang))) };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { topic, lang, tag } = await getPage(props);
  const t = await getT(lang);
  const title = String(renderTag(tag));

  return pageMetadata({
    lang,
    title,
    description: t(`topic.meta_other_${topic}_description`),
    keywords: [title, t(`topic.meta_${topic}_keywords`)].join(', '),
    image: getTagImageUrl(tag),
    smallImage: true,
    url: routes.tag(lang, topic, String(tag.slug)),
  });
}

/** Legacy pages/tag.js. */
export default async function TagPage(props: Props) {
  const { topic, lang, tag, articles } = await getPage(props);

  return (
    <div className="py-12">
      <div className="content-padding">
        <div className="text-base leading-6 uppercase">
          <TopicLink lang={lang} topic={topic} postfix="one" />
        </div>
        <h1 className="pb-[50px] text-[36px] leading-[42px] font-bold touch:text-5xl touch:leading-[60px]">
          {renderTag(tag)}
        </h1>
      </div>
      <ArticlesList articles={articles} lang={lang} />
    </div>
  );
}
