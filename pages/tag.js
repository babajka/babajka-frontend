import styles from 'styles/pages/tag.module.scss';

import React from 'react';
import bem from 'bem-css-modules';

import {
  MetaTitle,
  MetaImage,
  MetaDescription,
  MetaKeywords,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';
import { localize } from 'components/common/Text';
import ArticlesComposition from 'components/articles/compositions/ArticlesComposition';

import { makeRequest, catchServerErrors } from 'utils/request';
import { renderTag, getTopicLink, getTagImageUrl } from 'utils/features/tags';
import { getLocalizedTag, getLocalizedArticles } from 'utils/getters';
import host from 'utils/host';
import api from 'constants/api';

const b = bem(styles);

const TagPage = ({ lang, topic, tag, articles }) => {
  const title = renderTag(tag);
  const imageUrl = getTagImageUrl(tag);
  const metaKeywords = [title, localize(`topic.meta_${topic}_keywords`, lang)].join(', ');
  return (
    <>
      <MetaTitle title={title} />
      <MetaImage url={imageUrl ? `${host}${imageUrl}` : DEFAULT_IMAGE} small />
      <MetaDescription description={localize(`topic.meta_other_${topic}_description`, lang)} />
      <MetaKeywords keywords={metaKeywords} />

      <div className={b()}>
        <div className="wir-content-padding">
          <div className={b('topic')}>{getTopicLink({ topic, postfix: 'one' })}</div>
          <h1 className={b('title')}>{title}</h1>
        </div>
        <ArticlesComposition articles={articles} />
      </div>
    </>
  );
};

// TODO: replace with SSG after migration from `next-routes`
export const getServerSideProps = catchServerErrors(
  async ({ query: { topic, tag: tagSlug, lang } }) => {
    const { tag, articles } = await makeRequest(api.tags.getArticles(tagSlug));

    const localizedArticles = getLocalizedArticles(articles, lang);

    return {
      props: {
        topic,
        tag: getLocalizedTag(tag, lang),
        articles: localizedArticles,
      },
    };
  }
);

export default TagPage;
