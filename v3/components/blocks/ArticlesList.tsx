import ArticleCard from '@/components/cards/ArticleCard';
import PlaceholderCard from '@/components/cards/PlaceholderCard';
import type { ArticleCardContext } from '@/components/cards/sizes';
import type { Lang } from '@/constants';
import { cn } from '@/lib/utils/cn';
import type { LocalizedArticle } from '@/utils/getters';

import { FeaturedBlock } from './ArticleBlocks';
import BlockWrapper from './BlockWrapper';

type BaseProps = { articles: LocalizedArticle[]; lang: Lang; inViewport?: boolean };

const BLOCK_ROOT = 'mt-0 flex flex-col justify-between tablet-lg:mt-[60px] tablet-lg:flex-row';
const CARD_PADDING = 'py-2.5 tablet-lg:py-0';

type TagPageBlockBProps = BaseProps & { layout: 'large-left' | 'large-right' };

/** Legacy blocks/tags/TagPageBlockB.js. */
const TagPageBlockB = ({ articles, layout, lang, inViewport }: TagPageBlockBProps) => {
  const resolvedLayout = articles.length === 1 ? 'large-left' : layout;
  const pair = articles.slice(0, 2);
  const [first, second] = resolvedLayout === 'large-left' ? pair : pair.reverse();

  return (
    <BlockWrapper className={BLOCK_ROOT}>
      <div className={cn(CARD_PADDING, resolvedLayout === 'large-right' && 'order-1')}>
        <ArticleCard article={first} lang={lang} context="block-b-large" inViewport={inViewport} />
      </div>
      <div className={cn(CARD_PADDING, resolvedLayout === 'large-left' && 'order-1')}>
        {second ? (
          <ArticleCard
            article={second}
            lang={lang}
            context="block-b-small"
            inViewport={inViewport}
          />
        ) : (
          <PlaceholderCard />
        )}
      </div>
    </BlockWrapper>
  );
};

type TagPageBlockCDProps = BaseProps & { layout: 'row-of-two' | 'row-of-three' };

/** Legacy blocks/tags/TagPageBlockCD.js. */
const TagPageBlockCD = ({ articles, layout, lang, inViewport }: TagPageBlockCDProps) => {
  const isRowOfThree = layout === 'row-of-three';
  const context: ArticleCardContext = layout;

  return (
    <BlockWrapper className={cn(BLOCK_ROOT, isRowOfThree && 'tablet-lg:flex-col desktop:flex-row')}>
      {Array.from({ length: isRowOfThree ? 3 : 2 }, (_, index) => (
        <div
          key={index}
          className={cn(CARD_PADDING, isRowOfThree && 'tablet-lg:py-2.5 desktop:py-0')}
        >
          {articles[index] ? (
            <ArticleCard
              article={articles[index]}
              lang={lang}
              context={context}
              inViewport={inViewport}
            />
          ) : (
            <PlaceholderCard
              className={cn(isRowOfThree && 'desktop:block desktop:card-square-s')}
            />
          )}
        </div>
      ))}
    </BlockWrapper>
  );
};

const PAGE_LEVEL_ORDER = ['B1', 'C', 'D', 'C', 'B2', 'C', 'D', 'C'] as const;

/** 5 articles make 2 blocks: 2 + 3. */
export const arrangeListInBlocks = <T,>(articles: T[]) => {
  const blocks: T[][] = [];
  for (let i = 0; i < articles.length; i += 5) {
    blocks.push(articles.slice(i, i + 2), articles.slice(i + 2, i + 5));
  }
  return blocks.filter(block => block.length);
};

/** Legacy blocks/articles/list-block.js. */
export const ArticlesList = ({ articles, lang, inViewport }: BaseProps) => {
  if (!articles.length) {
    return null;
  }
  if (articles.length === 1) {
    return <FeaturedBlock article={articles[0]} lang={lang} inViewport={inViewport} />;
  }
  if (articles.length === 3) {
    // Exactly 3 articles shouldn't look like the first 3 of a long list.
    return (
      <TagPageBlockCD
        articles={articles}
        layout="row-of-three"
        lang={lang}
        inViewport={inViewport}
      />
    );
  }

  return arrangeListInBlocks(articles).map((block, index) => {
    const level = PAGE_LEVEL_ORDER[index % PAGE_LEVEL_ORDER.length];
    const props = { articles: block, lang, inViewport: inViewport && index < 1 };
    if (level === 'B1' || level === 'B2') {
      return (
        <TagPageBlockB
          key={index}
          {...props}
          layout={level === 'B1' ? 'large-left' : 'large-right'}
        />
      );
    }
    return (
      <TagPageBlockCD
        key={index}
        {...props}
        layout={level === 'C' ? 'row-of-three' : 'row-of-two'}
      />
    );
  });
};
