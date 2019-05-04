import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import keyBy from 'lodash/keyBy';

import BLOCKS_BY_TYPE from 'components/articles/blocks';

import { homeActions, homeSelectors } from 'redux/ducks/home';
import { populateRequest } from 'utils/request';
import { ArticleShape, TopicShape, TagShape } from 'utils/customPropTypes';

const mapStateToProps = (state, { lang }) => ({
  blocks: homeSelectors.getBlocks(state),
  data: homeSelectors.getData(state, lang),
});

class MainPage extends Component {
  static propTypes = {
    blocks: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(Object.keys(BLOCKS_BY_TYPE)).isRequired,
      })
    ).isRequired,
    data: PropTypes.shape({
      articles: PropTypes.objectOf(ArticleShape).isRequired,
      tags: PropTypes.objectOf(TagShape).isRequired,
      topics: PropTypes.objectOf(TopicShape).isRequired,
      latestArticles: PropTypes.arrayOf(ArticleShape).isRequired,
    }).isRequired,
  };

  static getInitialProps(ctx) {
    return populateRequest(ctx, homeActions.fetch);
  }

  static getLayoutProps = () => ({
    title: 'header.main',
  });

  render() {
    const { blocks, data } = this.props;
    return blocks.map((block, index) => {
      const Block = BLOCKS_BY_TYPE[block.type];
      if (!Block) {
        return null;
      }
      // eslint-disable-next-line react/no-array-index-key
      return <Block key={index} block={block} data={data} blocks={keyBy(blocks, 'type')} />;
    });
  }
}

export default connect(mapStateToProps)(MainPage);
