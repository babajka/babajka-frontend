import 'styles/pages/topic.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';

import Link from 'components/common/Link';
import ArticleCard from 'components/articles/cards/ArticleCard';

import { topicsActions, topicsSelectors } from 'redux/ducks/topics';
import { ArticleShape, TagShape } from 'utils/customPropTypes';
import { populateRequest } from 'utils/request';
import { renderTag } from 'utils/tags';
import { TOPICS } from 'constants';
import { ROUTES_NAMES } from 'routes';

const COLS_COUNT = 3;

const TopicSection = ({ tag, articles }) => {
  const [first, ...rest] = articles;
  return (
    <div className="topics__section">
      <div className="topics__section-title">{renderTag(tag)}</div>
      <div className="topics__section-image">
        <ArticleCard {...first} size="square-s" />
      </div>
      <ul className="topics__section-list">
        {rest.map(({ slug, title }) => (
          <li key={slug} className="topics__section-list-item">
            <Link route={ROUTES_NAMES.article} params={{ slug }}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

TopicSection.propTypes = {
  tag: TagShape.isRequired,
  articles: PropTypes.arrayOf(ArticleShape).isRequired,
};

const mapStateToProps = (state, { lang }) => topicsSelectors.getData(state, lang);

class TopicPage extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(TagShape).isRequired,
    articlesByTag: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    articleById: PropTypes.objectOf(ArticleShape).isRequired,
    routerQuery: PropTypes.shape({
      topic: PropTypes.oneOf(TOPICS).isRequired,
    }).isRequired,
  };

  static getInitialProps(ctx) {
    const {
      query: { topic },
    } = ctx;
    return populateRequest(ctx, topicsActions.fetchArticles.bind(null, topic));
  }

  static getLayoutProps = ({ routerQuery: { topic } }) => ({
    title: `topic.${topic}`,
  });

  render() {
    const { tags, articlesByTag, articleById } = this.props;
    const chunkSize = Math.ceil(tags.length / COLS_COUNT);
    return (
      <div className="topics">
        {chunk(tags, chunkSize).map((col, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="topics__column">
            {col.map(tag => (
              <TopicSection
                tag={tag}
                articles={articlesByTag[tag.slug].map(id => articleById[id])}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopicPage);
