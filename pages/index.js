import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import keyBy from 'lodash/keyBy';

import { homeActions, homeSelectors } from 'redux/ducks/home';
import { populateRequest } from 'utils/request';
import { ArticleShape, BrandShape, TopicShape, TagShape } from 'utils/customPropTypes';

const RENDER_TAG_CONTENT = {
  locations: ({ title }) => title,
  personalities: ({ name }) => name,
};

const renderTag = ({ topic, content }) => RENDER_TAG_CONTENT[topic.slug](content);

// TODO: extract render to components
const RENDER_BLOCK = {
  featured: ({ type, articleId, frozen }, { articles, latestArticles }) => {
    const articleData = frozen ? articles[articleId] : latestArticles[0];
    return (
      <div>
        {type}: {articleData.title}
      </div>
    );
  },
  diary: ({ type }) => type,
  latestArticles: ({ type, articlesIds }, { articles, latestArticles }, { featured }) => {
    let latestIndex = featured.frozen ? 0 : 1;
    return (
      <div>
        {type}:{' '}
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
  // RENDER_TAG_CONTENT[slug](tags[id].content)
  tagsByTopic: ({ type, topicId, tagsIds }, { tags, topics }) => {
    return (
      <div>
        {type}: <b>({topics[topicId].slug})</b> {tagsIds.map(id => `${renderTag(tags[id])}, `)}
      </div>
    );
  },
  articlesByTag2: ({ type }) => type,
  articlesByTag3: ({ type, tagId, articlesIds }, { tags, articles }) => (
    <div>
      {type}: <b>({renderTag(tags[tagId])})</b> {articlesIds.map(id => `${articles[id].title}, `)}
    </div>
  ),
  banner: ({ type }) => type,
  articlesByBrand: ({ type, brandId, articlesIds }, { brands, articles }) => (
    <div>
      {type}: <b>({brands[brandId].name})</b> {articlesIds.map(id => `${articles[id].title}, `)}
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
      brands: PropTypes.objectOf(BrandShape).isRequired,
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
      <div className="page-content">
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
