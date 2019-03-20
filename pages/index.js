import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import keyBy from 'lodash/keyBy';

import { homeActions, homeSelectors } from 'redux/ducks/home';
import { populateRequest } from 'utils/request';
import { ArticleShape, TopicShape, TagShape } from 'utils/customPropTypes';
import { renderTag } from 'utils/tags';

const renderArticlesByTag = ({ type, tagId, articlesIds }, { tags, articles }) => (
  <div>
    {type}: <b>({renderTag(tags[tagId])})</b> {articlesIds.map(id => `${articles[id].title}, `)}
  </div>
);

// TODO: extract render to components
const RENDER_BLOCK = {
  featured: ({ type, articleId, frozen }, { articles, latestArticles }) => {
    const articleData = frozen ? articles[articleId] : latestArticles[0];
    return (
      <div>
        -{type}: {articleData.title}
      </div>
    );
  },
  diary: ({ type }) => type,
  latestArticles: ({ type, articlesIds }, { articles, latestArticles }, { featured }) => {
    let latestIndex = featured.frozen ? 0 : 1;
    return (
      <div>
        -{type}:{' '}
        {articlesIds.map(({ id, frozen }) => {
          const articleData = frozen ? articles[id] : latestArticles[latestIndex];
          if (!frozen) {
            latestIndex += 1;
          }
          return `${articleData.title}, `;
        })}
      </div>
    );
  },
  tagsByTopic: ({ type, topicSlug, tagsIds, style }, { tags }) => {
    return (
      <div>
        -{type}/{style}: <b>({topicSlug})</b> {tagsIds.map(id => `${renderTag(tags[id])}, `)}
      </div>
    );
  },
  articlesByTag2: renderArticlesByTag,
  articlesByTag3: renderArticlesByTag,
  banner: ({ type }) => type,
  articlesByBrand: ({ type, tagId, articlesIds }, { tags, articles }) => (
    <div>
      -{type}: <b>({renderTag(tags[tagId])})</b> {articlesIds.map(id => `${articles[id].title}, `)}
    </div>
  ),
};

const mapStateToProps = (state, { lang }) => ({
  blocks: homeSelectors.getBlocks(state),
  data: homeSelectors.getData(state, lang),
});

class MainPage extends Component {
  static propTypes = {
    blocks: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(Object.keys(RENDER_BLOCK)).isRequired,
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
    return (
      <div style={{ margin: 20 }}>
        Main Page
        <div>
          {blocks.map((block, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>{RENDER_BLOCK[block.type](block, data, keyBy(blocks, 'type'))}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MainPage);
