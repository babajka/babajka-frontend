import styles from 'styles/pages/collection.module.scss';

import React from 'react';
import bem from 'bem-css-modules';
import omit from 'lodash/omit';

import {
  MetaTitle,
  MetaImage,
  MetaDescription,
  MetaKeywords,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';
import Text, { localize } from 'components/common/Text';
import Image from 'components/common/Image';
import ArticlesComposition from 'features/articles/compositions/ArticlesComposition';

import { makeRequest, catchServerSideErrors } from 'utils/request';
import { getTagLink } from 'utils/features/tags';
import { renderNodeList } from 'utils/ui';
import { getLocalizedCollection, getLocalizedArticles } from 'utils/getters';
import api from 'constants/api';
import host from 'utils/host';

const b = bem(styles);

const CollectionPage = ({ slug, collection, metaKeywords, articles, authors }) => (
  <>
    <MetaTitle title={collection.name} />
    <MetaImage url={collection.cover ? `${host}${collection.cover}` : DEFAULT_IMAGE} small />
    <MetaDescription description={collection.description} />
    <MetaKeywords keywords={metaKeywords} />
    <div className={b()}>
      <div className="wir-content-padding">
        <div className={b('heading')}>
          <Image
            className={b('cover')}
            alt={collection.name}
            sourceSizes={[90]}
            baseUrl={collection.cover}
            mode="x"
          />
          <div className={b('text')}>
            <div className={b('subheading')}>
              <Text id="collection.one" />
            </div>
            <h1 className={b('title', { 'hack-starbellit': slug === 'starbellit' })}>
              {collection.name}
            </h1>
            <div className={b('authors')}>
              {renderNodeList(authors.map(tag => getTagLink({ tag })))}
            </div>
          </div>
        </div>
      </div>
      <ArticlesComposition articles={articles} />
    </div>
  </>
);

// TODO: replace with SSG after migration from `next-routes`
export const getServerSideProps = catchServerSideErrors(async ({ query: { slug, lang } }) => {
  const { collection } = await makeRequest(api.collections.getOne(slug));
  const localizedArticles = getLocalizedArticles(collection.articles, lang);

  const authors = Object.values(
    localizedArticles.reduce((acc, { tagsByTopic: { authors: articleAuthors } }) => {
      articleAuthors.forEach(authorTag => {
        acc[authorTag.slug] = authorTag;
      });
      return acc;
    }, {})
  );

  const metaKeywords = [collection.name, localize(`collection.meta_keywords`, lang)].join(', ');

  return {
    props: {
      collection: getLocalizedCollection(omit(collection, ['articles']), lang),
      articles: localizedArticles,
      authors,
      metaKeywords,
      slug,
    },
  };
});

export default CollectionPage;
