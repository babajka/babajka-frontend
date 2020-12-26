import styles from 'styles/pages/topic.module.scss';

import React from 'react';
import cn from 'classnames';
import bem from 'bem-css-modules';
import keyBy from 'lodash/keyBy';

import Link from 'components/common/Link';
import { localize } from 'components/common/Text';
import { MetaTitle, MetaDescription, MetaKeywords } from 'components/social/Metatags';

import { TagShape, ArticlesArray } from 'utils/customPropTypes';
import { getLocalizedTag, getLocalizedArticles } from 'utils/getters';
import { makeRequest, catchServerSideErrors } from 'utils/request';
import { renderTag } from 'utils/features/tags';
import { ROUTES_NAMES } from 'routes';
import api from 'constants/api';

const b = bem(styles);

const TopicSection = ({ tag, articles }) => (
  <div className={b('section')}>
    <div className={b('section-title')}>{renderTag(tag)}</div>
    <ul className={b('section-list')}>
      {articles.map(({ slug, title }) => (
        <li key={slug} className={b('section-list-item')}>
          <Link route={ROUTES_NAMES.article} params={{ slug }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

TopicSection.propTypes = {
  tag: TagShape.isRequired,
  articles: ArticlesArray.isRequired,
};

const TopicPage = ({ lang, topicSlug, tags, articlesByTag, articleById }) => (
  <>
    <MetaTitle title={localize(`topic.${topicSlug}`, lang)} />
    <MetaDescription description={localize(`topic.meta_${topicSlug}_description`, lang)} />
    <MetaKeywords keywords={localize(`topic.meta_${topicSlug}_keywords`, lang)} />

    <div className={cn('wir-content-padding', b())}>
      {tags.map(tag => (
        <TopicSection
          key={tag.id}
          tag={tag}
          articles={articlesByTag[tag.slug].map(id => articleById[id])}
        />
      ))}
    </div>
  </>
);

TopicPage.getLayoutProps = ({ topicSlug }) => ({
  title: `topic.${topicSlug}`,
});

// TODO: replace with SSG after migration from `next-routes`
export const getServerSideProps = catchServerSideErrors(
  async ({ query: { topic: topicSlug, lang } }) => {
    const { tags: rawTags, topic, articles, articlesByTag } = await makeRequest(
      api.topics.getArticles(topicSlug)
    );

    const sortTags = (x, y) => articlesByTag[y.slug].length - articlesByTag[x.slug].length;

    const tags = rawTags
      .filter(({ slug }) => articlesByTag[slug]?.length)
      .map(tag => getLocalizedTag({ ...tag, topic }, lang))
      .sort(sortTags);

    return {
      props: {
        topicSlug,
        articleById: keyBy(getLocalizedArticles(articles, lang), 'id'),
        tags,
        articlesByTag,
      },
    };
  }
);

export default TopicPage;
