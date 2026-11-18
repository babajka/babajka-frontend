import type { Lang } from '@/constants';
import type { ArticleRef, Block, DiaryResponse } from '@/lib/types';
import type { LocalizedArticle, LocalizedBlocksData, LocalizedTag } from '@/utils/getters';

import { ArticlesByTag2, ArticlesByTag3, FeaturedBlock, TwoArticlesInRow } from './ArticleBlocks';
import { ArticlesList } from './ArticlesList';
import BannerBlock from './BannerBlock';
import DiaryBlock from './DiaryBlock';
import TagsByTopic from './TagsByTopic';

type CardBlocksLayoutProps = {
  blocks: Block[];
  data: LocalizedBlocksData;
  diary?: DiaryResponse;
  lang: Lang;
  inViewport?: boolean;
};

const isPresent = <T,>(value: T | undefined): value is T => value !== undefined;

/** Frozen cards name their article, the others take the next one of the latest articles. */
const resolveLatest = (
  [first, second]: ArticleRef[],
  { articles = {}, latestArticles = [] }: LocalizedBlocksData,
  startIndex: number
) => {
  let nextIndex = startIndex;
  const resolve = (ref?: ArticleRef): LocalizedArticle | undefined => {
    if (ref?.frozen) {
      return ref.id ? articles[ref.id] : undefined;
    }
    nextIndex += 1;
    return latestArticles[nextIndex - 1];
  };
  const resolvedFirst = resolve(first);
  return { first: resolvedFirst, second: resolve(second) };
};

/** Legacy features/layout/card-blocks-layout.js. */
const CardBlocksLayout = ({ blocks, data, diary, lang, inViewport }: CardBlocksLayoutProps) => {
  const { articles = {}, tags = {}, latestArticles = [] } = data;
  const getArticles = (ids: string[]) => ids.map(id => articles[id]).filter(isPresent);
  const getTags = (ids: string[]): LocalizedTag[] => ids.map(id => tags[id]).filter(isPresent);
  const featured = blocks.find(block => block.type === 'featured');

  return blocks.map((block, index) => {
    const props = {
      lang,
      inViewport: inViewport && index < (block.type === 'banner' ? 2 : 1),
    };

    switch (block.type) {
      case 'featured':
        return (
          <FeaturedBlock
            key={index}
            {...props}
            article={
              block.frozen && block.articleId ? articles[block.articleId] : latestArticles[0]
            }
          />
        );
      case 'diary':
        return diary ? (
          <DiaryBlock key={index} initial={diary} inViewport={props.inViewport} />
        ) : null;
      case 'latestArticles':
        return (
          <TwoArticlesInRow
            key={index}
            {...props}
            {...resolveLatest(block.articlesIds, data, featured && !featured.frozen ? 1 : 0)}
          />
        );
      case 'tagsByTopic':
        return (
          <TagsByTopic
            key={index}
            {...props}
            topic={block.topicSlug}
            style={block.style}
            tags={getTags(block.tagsIds)}
          />
        );
      case 'articlesByTag2':
      case 'articlesByTag3': {
        const tag = tags[block.tagId];
        if (!tag) {
          return null;
        }
        const Block = block.type === 'articlesByTag2' ? ArticlesByTag2 : ArticlesByTag3;
        return <Block key={index} {...props} tag={tag} articles={getArticles(block.articlesIds)} />;
      }
      case 'banner':
        return <BannerBlock key={index} {...props} banner={block.banner} />;
      case 'list':
        return <ArticlesList key={index} {...props} articles={getArticles(block.articles)} />;
      default:
        return null;
    }
  });
};

export default CardBlocksLayout;
