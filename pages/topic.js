import styles from 'styles/pages/topic.module.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import bem from 'bem-css-modules';

import Link from 'components/common/Link';
import { localize } from 'components/common/Text';
import ArticleCard from 'components/articles/cards/ArticleCard';
import { MetaTitle, MetaDescription, MetaKeywords } from 'components/social/Metatags';

import { topicsActions, topicsSelectors } from 'redux/ducks/topics';
import {
  ArticlesById,
  TagShape,
  TagsArray,
  ArticlesArray,
  IdsArray,
  LangType,
} from 'utils/customPropTypes';
import { populateRequest } from 'utils/request';
import { renderTag } from 'utils/tags';
import { TOPICS } from 'constants';
import { ROUTES_NAMES } from 'routes';

const b = bem(styles);

const TopicSection = ({ tag, articles }) => {
  const [first, ...rest] = articles;
  // const showCard = articles.length > 1;
  const showCard = false;
  const list = showCard ? rest : articles;
  return (
    <div className={b('section')}>
      <div className={b('section-title')}>{renderTag(tag)}</div>
      {showCard && (
        <div className={b('section-image')}>
          <ArticleCard {...first} size="square-s" />
        </div>
      )}
      <ul className={b('section-list')}>
        {list.map(({ slug, title }) => (
          <li key={slug} className={b('section-list-item')}>
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

const mapStateToProps = (state, { lang }) => topicsSelectors.getData(state, lang);

const TopicPage = ({ lang, routerQuery: { topic }, tags, articlesByTag, articleById }) => {
  const filteredTags = tags.filter(({ slug }) => articlesByTag?.[slug].length);
  return (
    <>
      <MetaTitle title={localize(`topic.${topic}`, lang)} />
      <MetaDescription description={localize(`topic.meta_${topic}_description`, lang)} />
      <MetaKeywords keywords={localize(`topic.meta_${topic}_keywords`, lang)} />

      <div className={cn('wir-content-padding', b())}>
        {filteredTags
          .sort((tagA, tagB) => articlesByTag[tagB.slug].length - articlesByTag[tagA.slug].length)
          .map(tag => (
            <TopicSection
              key={tag.id}
              tag={tag}
              articles={articlesByTag[tag.slug].map(id => articleById[id])}
            />
          ))}
      </div>
    </>
  );
};

TopicPage.propTypes = {
  lang: LangType.isRequired,
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
