import type { Metadata } from 'next';

import { ArticlesList } from '@/components/blocks/ArticlesList';
import { TagNameLinks } from '@/components/blocks/TopicLink';
import Image from '@/components/ui/Image';
import { getLang, getT } from '@/lib/i18n/server';
import { getCollectionPage } from '@/lib/loaders';
import { pageMetadata } from '@/lib/metadata';
import { orNotFound } from '@/lib/request';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils/cn';
import { getCollectionAuthors } from '@/utils/getters';

// Waits for the collection, like legacy SSR: without it the page has no useful content to show.
export const instant = false;

/** One collection validates the route at build time; the others are cached on the first visit. */
export const generateStaticParams = () => [{ slug: 'bel-kino' }];

type Props = PageProps<'/[lang]/collection/[slug]'>;

const getPage = async ({ params }: Props) => {
  const { slug } = await params;
  const lang = await getLang();
  return { slug, lang, ...(await orNotFound(getCollectionPage(decodeURIComponent(slug), lang))) };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug, lang, collection } = await getPage(props);
  const t = await getT(lang);
  const name = collection.name ?? '';

  return pageMetadata({
    lang,
    title: name,
    description: collection.description ?? '',
    keywords: [name, t('collection.meta_keywords')].join(', '),
    image: collection.cover,
    smallImage: true,
    url: routes.collection(lang, slug),
  });
}

/** Legacy pages/collection.js. */
export default async function CollectionPage(props: Props) {
  const { slug, lang, collection, articles } = await getPage(props);
  const t = await getT(lang);

  return (
    <div className="py-12">
      <div className="content-padding">
        <div className="flex flex-col pb-[46px] touch:flex-row">
          {collection.cover && (
            <Image
              className="mb-[30px] size-[90px] rounded-full touch:mr-[29px] touch:mb-0"
              alt={collection.name ?? ''}
              size={90}
              baseUrl={collection.cover}
              inViewport
            />
          )}
          <div>
            <div className="text-sm leading-6 tracking-[1px] uppercase">{t('collection.one')}</div>
            <h1
              className={cn(
                'text-[30px] leading-9 font-bold tablet-lg:text-5xl tablet-lg:leading-[60px]',
                slug === 'starbellit' &&
                  'text-2xl leading-[30px] tablet:text-[30px] tablet:leading-9'
              )}
            >
              {collection.name}
            </h1>
            <div className="text-base leading-6 text-primary">
              <TagNameLinks lang={lang} tags={getCollectionAuthors(articles)} />
            </div>
          </div>
        </div>
      </div>
      <ArticlesList articles={articles} lang={lang} />
    </div>
  );
}
