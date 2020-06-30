import styles from 'styles/pages/tag.module.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bem from 'bem-css-modules';

import {
  MetaTitle,
  MetaImage,
  MetaDescription,
  MetaKeywords,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';
import { localize } from 'components/common/Text';
import FeaturedBlock from 'components/articles/blocks/FeaturedBlock';
import TagPageBlockB from 'components/articles/blocks/TagPageBlockB';
import TagPageBlockCD from 'components/articles/blocks/TagPageBlockCD';

import { tagsActions, tagsSelectors } from 'redux/ducks/tags';
import { ArticlesArray, TagShape, LangType } from 'utils/customPropTypes';
import { populateRequest } from 'utils/request';
import { renderTag, getTopicLink, getTagImageUrl } from 'utils/tags';
import host from 'utils/host';

import { TOPICS } from 'constants';

const b = bem(styles);
const PAGE_LEVEL_ORDER = ['B1', 'C', 'D', 'C', 'B2', 'C', 'D', 'C'];

const BLOCK_BY_LEVEL = {
  B1: TagPageBlockB,
  B2: TagPageBlockB,
  C: TagPageBlockCD,
  D: TagPageBlockCD,
};

const LAYOUT_BY_LEVEL = {
  B1: 'large-left',
  B2: 'large-right',
  C: 'row-of-three',
  D: 'row-of-two',
};

export const ArticlesBlocks = ({ articlesCount, blocks }) => {
  if (articlesCount === 1) {
    const [article] = blocks[0];
    const { articleId } = article;
    return (
      <FeaturedBlock
        // This is a workaround in order to use FeaturedBlock as it is.
        block={{ frozen: true, articleId }}
        data={{ articles: { [articleId]: article } }}
      />
    );
  }

  return blocks.map((block, index) => {
    const levelName = PAGE_LEVEL_ORDER[index % PAGE_LEVEL_ORDER.length];
    const Block = BLOCK_BY_LEVEL[levelName];
    // eslint-disable-next-line react/no-array-index-key
    return <Block key={index} articles={block} layout={LAYOUT_BY_LEVEL[levelName]} />;
  });
};

const mapStateToProps = (state, { lang }) => tagsSelectors.getData(state, lang);

const TagPage = ({ lang, routerQuery: { topic }, tag, blocks, articlesCount }) => {
  const title = renderTag(tag);
  const imageUrl = getTagImageUrl(tag);
  const metaKeywords = [title, localize(`topic.meta_${topic}_keywords`, lang)].join(', ');
  return (
    <>
      <MetaTitle title={title} />
      <MetaImage url={imageUrl ? `${host}${imageUrl}` : DEFAULT_IMAGE} small />
      <MetaDescription description={localize(`topic.meta_other_${topic}_description`, lang)} />
      <MetaKeywords keywords={metaKeywords} />

      <div className={b()}>
        <div className="wir-content-padding">
          <div className={b('topic')}>{getTopicLink({ topic, postfix: 'one' })}</div>
          <div className={b('title')}>{title}</div>
        </div>
        <ArticlesBlocks articlesCount={articlesCount} blocks={blocks} />
      </div>
    </>
  );
};

TagPage.propTypes = {
  lang: LangType.isRequired,
  routerQuery: PropTypes.shape({
    topic: PropTypes.oneOf(TOPICS).isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
  tag: TagShape.isRequired,
  blocks: PropTypes.arrayOf(ArticlesArray).isRequired,
  articlesCount: PropTypes.number.isRequired,
};

TagPage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { tag } }) => tagsActions.fetchArticles(tag));

export default connect(mapStateToProps)(TagPage);
