import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filter from 'lodash/filter';

import BLOCKS_BY_TYPE from 'components/articles/blocks';

import { homeActions, homeSelectors } from 'redux/ducks/home';
import { populateRequest } from 'utils/request';
import { ArticlesArray, ArticlesById, TopicsById, TagsById, LangType } from 'utils/customPropTypes';

const mapStateToProps = (state, { lang }) => ({
  blocks: homeSelectors.getBlocks(state),
  data: homeSelectors.getData(state, lang),
});

const MainPage = ({ blocks, data, lang }) =>
  blocks.map((block, index) => {
    const Block = BLOCKS_BY_TYPE[block.type];
    if (!Block) {
      return null;
    }
    const options = {};
    if (block.type === 'latestArticles') {
      // This is the only block which behavior depends on behavior of other blocks
      // i.e. additional options must be passed.
      const featured = filter(blocks, { type: 'featured' });
      if (featured.length > 0) {
        options.offset = featured[0].frozen ? 0 : 1;
        // TODO: to handle situation with multiple 'featured' blocks or 'featured' blocks
        // going *after* latestArticles.
      }
    }
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Block key={index} block={block} data={data} options={options} lang={lang} />
    );
  });

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
