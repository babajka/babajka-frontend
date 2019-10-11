import 'styles/pages/tag.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeaturedBlock from 'components/articles/blocks/FeaturedBlock';
import TagPageBlockB from 'components/articles/blocks/TagPageBlockB';
import TagPageBlockCD from 'components/articles/blocks/TagPageBlockCD';

import { tagsActions, tagsSelectors } from 'redux/ducks/tags';
import { ArticlesArray, TagShape } from 'utils/customPropTypes';
import { populateRequest } from 'utils/request';
import { renderTag, getTopicLink } from 'utils/tags';
import { toTitleCase } from 'utils/formatters';

import { TOPICS } from 'constants';

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

const ArticlesBlocks = ({ articlesCount, blocks }) => {
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
    if (!block.length) {
      // Q: How's that happening last block always contains no articles?
      return <></>;
    }
    const levelName = PAGE_LEVEL_ORDER[index % PAGE_LEVEL_ORDER.length];
    const Block = BLOCK_BY_LEVEL[levelName];
    // eslint-disable-next-line react/no-array-index-key
    return <Block key={index} articles={block} layout={LAYOUT_BY_LEVEL[levelName]} />;
  });
};

const mapStateToProps = (state, { lang }) => tagsSelectors.getData(state, lang);

const TagPage = ({ routerQuery: { topic }, tag, blocks, articlesCount }) => (
  <div className="tag-page">
    <div className="wir-content-padding tag-page__header">
      <div className="tag-page__topic">{getTopicLink({ topic, postfix: 'one' })}</div>
      <div className="tag-page__title">{renderTag(tag)}</div>
    </div>
    <ArticlesBlocks articlesCount={articlesCount} blocks={blocks} />
  </div>
);

TagPage.propTypes = {
  routerQuery: PropTypes.shape({
    topic: PropTypes.oneOf(TOPICS).isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
  tag: TagShape.isRequired,
  blocks: PropTypes.arrayOf(ArticlesArray).isRequired,
  articlesCount: PropTypes.number.isRequired,
};

TagPage.getLayoutProps = ({ routerQuery: { tag } }) => ({
  noLocTitle: toTitleCase(tag),
});

TagPage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { tag } }) => tagsActions.fetchArticles(tag));

export default connect(mapStateToProps)(TagPage);
