import 'styles/pages/topic.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';

import Link from 'components/common/Link';
import ArticleCard from 'components/articles/cards/ArticleCard';
import { MetaImage } from 'components/social/Metatags';

import { topicsActions, topicsSelectors } from 'redux/ducks/topics';
import { ArticlesById, TagShape, TagsArray, ArticlesArray, IdsArray } from 'utils/customPropTypes';
import { populateRequest } from 'utils/request';
import { renderTag } from 'utils/tags';
import { TOPICS } from 'constants';
import { ROUTES_NAMES } from 'routes';

const TopicSection = ({ tag, articles }) => {
  const [first, ...rest] = articles;
  const showCard = articles.length > 1;
  const list = showCard ? rest : articles;
  return (
    <div className="topics__section">
      <div className="topics__section-title">{renderTag(tag)}</div>
      {showCard && (
        <div className="topics__section-image">
          <ArticleCard {...first} size="square-s" />
        </div>
      )}
      <ul className="topics__section-list">
        {list.map(({ slug, title }) => (
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
  articles: ArticlesArray.isRequired,
};

const COLS_COUNT = 3;

const mapStateToProps = (state, { lang }) => topicsSelectors.getData(state, lang);

const TopicPage = ({ tags, articlesByTag, articleById }) => {
  const filteredTags = tags.filter(({ slug }) => articlesByTag[slug] && articlesByTag[slug].length);
  return (
    <>
      <MetaImage url="" />

      <div className="wir-content-padding topics wir-no-background">
        {chunk(filteredTags, Math.ceil(filteredTags.length / COLS_COUNT)).map((col, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="topics__column">
            {col.map(tag => (
              <TopicSection
                key={tag.id}
                tag={tag}
                articles={articlesByTag[tag.slug].map(id => articleById[id])}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

TopicPage.propTypes = {
  tags: TagsArray.isRequired,
  articlesByTag: PropTypes.objectOf(IdsArray).isRequired,
  articleById: ArticlesById.isRequired,
  routerQuery: PropTypes.shape({
    topic: PropTypes.oneOf(TOPICS).isRequired,
  }).isRequired,
};

TopicPage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { topic } }) => topicsActions.fetchArticles(topic));

TopicPage.getLayoutProps = ({ routerQuery: { topic } }) => ({
  title: `topic.${topic}`,
});

export default connect(mapStateToProps)(TopicPage);
