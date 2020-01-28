import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import keyBy from 'lodash/keyBy';

import BLOCKS_BY_TYPE from 'components/articles/blocks';

import { homeActions, homeSelectors } from 'redux/ducks/home';
import { populateRequest } from 'utils/request';
import { ArticlesArray, ArticlesById, TopicsById, TagsById, LangType } from 'utils/customPropTypes';

const mapStateToProps = (state, { lang = 'be' }) => ({
  blocks: homeSelectors.getBlocks(state),
  data: homeSelectors.getData(state, lang),
  lang,
});

const MainPage = ({ blocks, data, lang }) => {
  const blocksByType = keyBy(blocks, 'type');
  return blocks.map((block, index) => {
    const Block = BLOCKS_BY_TYPE[block.type];
    if (!Block) {
      return null;
    }
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Block key={index} block={block} data={data} blocks={blocksByType} lang={lang} />
    );
  });
};

MainPage.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(Object.keys(BLOCKS_BY_TYPE)).isRequired,
    })
  ).isRequired,
  data: PropTypes.shape({
    articles: ArticlesById.isRequired,
    tags: TagsById.isRequired,
    topics: TopicsById.isRequired,
    latestArticles: ArticlesArray.isRequired,
  }).isRequired,
  lang: LangType.isRequired,
};

MainPage.getInitialProps = ctx => populateRequest(ctx, homeActions.fetch);

MainPage.getLayoutProps = () => ({
  title: 'header.main',
});

export default connect(mapStateToProps)(MainPage);
