import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BLOCKS_BY_TYPE from 'components/articles/blocks';

import { homeActions, homeSelectors } from 'redux/ducks/home';
import { populateRequest } from 'utils/request';
import { ArticlesArray, ArticlesById, TopicsById, TagsById } from 'utils/customPropTypes';

import CardsLayout from 'components/articles/layout/CardsLayout';

const mapStateToProps = (state, { lang = 'be' }) => ({
  blocks: homeSelectors.getBlocks(state),
  data: homeSelectors.getData(state, lang),
});

const MainPage = ({ blocks, data }) => <CardsLayout blocks={blocks} data={data} />;

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
};

MainPage.getInitialProps = ctx => populateRequest(ctx, homeActions.fetch);

MainPage.getLayoutProps = () => ({
  title: 'header.main',
});

export default connect(mapStateToProps)(MainPage);
