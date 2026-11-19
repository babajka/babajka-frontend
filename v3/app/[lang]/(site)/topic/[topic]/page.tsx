import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { renderTag } from '@/components/tags';
import Link from '@/components/ui/Link';
import { isKnownTopic, TOPICS, type Topic } from '@/constants';
import { getLang, getT } from '@/lib/i18n/server';
import { getTopicPage } from '@/lib/loaders';
import { pageMetadata } from '@/lib/metadata';
import { routes } from '@/lib/routes';

export const generateStaticParams = () => TOPICS.map(topic => ({ topic }));

const getTopic = async ({ params }: PageProps<'/[lang]/topic/[topic]'>): Promise<Topic> => {
  const { topic } = await params;
  if (!isKnownTopic(topic)) {
    notFound();
  }
  return topic;
};

export async function generateMetadata(
  props: PageProps<'/[lang]/topic/[topic]'>
): Promise<Metadata> {
  const topic = await getTopic(props);
  const lang = await getLang();
  const t = await getT(lang);

  return pageMetadata({
    lang,
    title: t(`topic.${topic}`),
    description: t(`topic.meta_${topic}_description`),
    keywords: t(`topic.meta_${topic}_keywords`),
    url: routes.topic(lang, topic),
  });
}

/** Legacy pages/topic.js: every tag of the topic with its articles. */
export default async function TopicPage(props: PageProps<'/[lang]/topic/[topic]'>) {
  const topic = await getTopic(props);
  const lang = await getLang();
  const sections = await getTopicPage(topic, lang);

  return (
    <div className="flex flex-row flex-wrap content-between justify-start content-padding">
      {sections.map(({ tag, articles }) => (
        <div
          key={tag.id}
          className="box-content w-[300px] touch:pr-[120px] touch:pl-[60px] tablet:w-[312px] tablet:px-0 tablet-lg:w-[409px] desktop:w-[340px]"
        >
          <div className="pt-10 pb-2.5 text-xl leading-6 font-bold">{renderTag(tag)}</div>
          <ul className="pr-2.5 text-base text-primary">
            {articles.map(article => {
              const { slug, title } = article as unknown as { slug: string; title: string };
              return (
                <li key={slug} className="py-2.5">
                  <Link href={routes.article(lang, slug)}>{title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
