import Image from '@/components/ui/Image';
import Link from '@/components/ui/Link';
import type { Lang } from '@/constants';
import { createT } from '@/lib/i18n/dict';
import { routes } from '@/lib/routes';
import type { LocalizedCollection } from '@/utils/getters';

const COLLECTIONS_HIDE_COVER = new Set(['starbellit']);

const ITEM = 'mb-2 last:mb-0 touch:mb-2.5 tablet:mb-5 tablet:last:mb-0';

type CollectionNoteProps = {
  collection: LocalizedCollection;
  /** Language of the page's links. */
  lang: Lang;
  /** Language of the article. */
  locale: Lang;
};

/** Legacy features/articles/CollectionNote.js. */
const CollectionNote = ({ collection, lang, locale }: CollectionNoteProps) => {
  const { cover, articleIndex, name, articles, slug } = collection;
  const t = createT(locale);
  const href = routes.collection(lang, slug);

  return (
    <div className="mt-[30px] mr-0 mb-5 ml-2.5 box-content w-[250px] border-l border-black pb-2.5 pl-5 text-sm leading-[18px] touch:float-right touch:mt-6 touch:ml-5 touch:w-[200px] tablet:mt-[30px] tablet:w-[250px] tablet:text-base tablet:leading-5">
      {cover && !COLLECTIONS_HIDE_COVER.has(slug) && (
        <Link href={href}>
          <Image
            className="float-right size-[70px] rounded-full"
            alt={name ?? ''}
            size={70}
            baseUrl={cover}
          />
        </Link>
      )}
      <div>
        <div className={ITEM}>
          {t('article.this-is-the')} {articleIndex + 1} {t('article.of-collection')}
          <br />
          <Link className="font-bold" href={href}>
            {name}
          </Link>
        </div>
        {articles?.map((article, index) => {
          if (!article) {
            return null;
          }
          const text = `${index + 1}. ${String(article.title)}`;
          return (
            <div key={article.id} className={ITEM}>
              {index === articleIndex ? (
                text
              ) : (
                <Link href={routes.article(lang, String(article.slug))}>{text}</Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionNote;
