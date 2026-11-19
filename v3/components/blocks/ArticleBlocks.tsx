import ArticleCard from '@/components/cards/ArticleCard';
import type { Lang } from '@/constants';
import { createT } from '@/lib/i18n/dict';
import { cn } from '@/lib/utils/cn';
import TagImage from '@/components/TagImage';
import type { LocalizedArticle, LocalizedTag } from '@/utils/getters';

import BlockWrapper from './BlockWrapper';
import { TagNameLink, TopicLink } from './TopicLink';

type BaseProps = { lang: Lang; inViewport?: boolean };

/** Legacy blocks/articles/FeaturedBlock.js. */
export const FeaturedBlock = ({
  article,
  lang,
  inViewport,
}: BaseProps & { article?: LocalizedArticle }) =>
  article ? (
    <BlockWrapper>
      <ArticleCard article={article} lang={lang} context="featured" inViewport={inViewport} />
    </BlockWrapper>
  ) : null;

type TwoArticlesInRowProps = BaseProps & {
  first?: LocalizedArticle;
  second?: LocalizedArticle;
  className?: string;
};

/** Legacy blocks/articles/TwoArticlesInRow.js. */
export const TwoArticlesInRow = ({
  first,
  second,
  lang,
  inViewport,
  className,
}: TwoArticlesInRowProps) => (
  <BlockWrapper className={cn('flex flex-col justify-between tablet-lg:flex-row', className)}>
    <div className="mb-[30px] tablet-lg:mb-0">
      {first && (
        <ArticleCard
          article={first}
          lang={lang}
          context="two-in-row-first"
          inViewport={inViewport}
        />
      )}
    </div>
    <div>
      {second && (
        <ArticleCard
          article={second}
          lang={lang}
          context="two-in-row-second"
          inViewport={inViewport}
        />
      )}
    </div>
  </BlockWrapper>
);

type ArticlesByTagProps = BaseProps & { tag: LocalizedTag; articles: LocalizedArticle[] };

const LABEL = 'inline-block w-full text-sm leading-6 tracking-[1px] text-white uppercase';

/** Legacy blocks/articles/ArticlesByTag2.js. */
export const ArticlesByTag2 = ({ tag, articles, lang, inViewport }: ArticlesByTagProps) => {
  const { topicSlug } = tag;
  const isBrand = topicSlug === 'brands';
  const [first, second] = articles;
  const topicLink = <TopicLink lang={lang} topic={topicSlug} dark />;

  return (
    <BlockWrapper
      className="flex flex-col justify-between tablet:flex-row tablet:pt-9 tablet:pb-[59px] desktop:pt-[42px] desktop:pb-[62px]"
      withBackground
    >
      <div
        className={cn(
          'flex w-full flex-col justify-between text-center touch:text-left tablet:w-[120px]',
          isBrand && 'tablet:order-1'
        )}
      >
        <div className="my-[45px] tablet:my-0">
          {isBrand && <TagImage tag={tag} theme="dark" className="h-12" inViewport={inViewport} />}
          <div className={LABEL}>
            {createT(lang)(`topic.${topicSlug}_essentials`)}:{' '}
            <TagNameLink lang={lang} tag={tag} dark />
          </div>
        </div>
        <div className={cn(LABEL, 'hidden tablet:inline-block')}>{topicLink}</div>
      </div>

      <div className="flex flex-row justify-between desktop:w-[840px]">
        <div className="my-5 tablet:my-0">
          {first && (
            <ArticleCard
              article={first}
              lang={lang}
              context="articles-by-tag-2"
              inViewport={inViewport}
              onBackground
            />
          )}
        </div>
        <div className="hidden desktop:block">
          {second && (
            <ArticleCard
              article={second}
              lang={lang}
              context="articles-by-tag-2"
              inViewport={inViewport}
              onBackground
            />
          )}
        </div>
      </div>

      <div className="w-full text-center touch:text-left tablet:hidden">
        <div className={cn(LABEL, 'my-[45px]')}>{topicLink}</div>
      </div>
    </BlockWrapper>
  );
};

const TITLE = 'text-sm leading-[21px] tracking-[1px] uppercase';
const CARD_VISIBILITY = ['block', 'hidden tablet:block', 'hidden desktop:block'];

/** Legacy blocks/articles/ArticlesByTag3.js. */
export const ArticlesByTag3 = ({ tag, articles, lang, inViewport }: ArticlesByTagProps) => {
  const tagLink = <TagNameLink lang={lang} tag={tag} dark />;
  const topicLink = <TopicLink lang={lang} topic={tag.topicSlug} dark />;

  return (
    <BlockWrapper>
      <div
        className={cn(TITLE, 'hidden justify-between border-b border-grey pb-[18px] tablet:flex')}
      >
        {tagLink}
        {topicLink}
      </div>
      <div className={cn(TITLE, 'border-t border-grey py-[15px] text-center tablet:hidden')}>
        {tagLink}
      </div>
      <div className="flex flex-row justify-between tablet:mt-[30px]">
        {articles.map((article, index) => (
          <div key={article.id} className={CARD_VISIBILITY[index]}>
            <ArticleCard
              article={article}
              lang={lang}
              context="articles-by-tag-3"
              inViewport={inViewport}
            />
          </div>
        ))}
      </div>
      <div className={cn(TITLE, 'py-[15px] text-center tablet:hidden')}>{topicLink}</div>
    </BlockWrapper>
  );
};
