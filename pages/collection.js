import styles from 'styles/pages/collection.module.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bem from 'bem-css-modules';

import {
  MetaTitle,
  MetaImage,
  MetaDescription,
  MetaKeywords,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';
import Text, { localize } from 'components/common/Text';
import Image from 'components/common/Image';
import ArticlesComposition from 'components/articles/compositions/ArticlesComposition';

import { collectionsActions, collectionsSelectors } from 'redux/ducks/collections';
import { ArticlePreviewArray, CollectionShape, LangType, TagShape } from 'utils/customPropTypes';
import { populateRequest } from 'utils/request';
import { getTagLink } from 'utils/tags';
import { renderNodeList } from 'utils/formatters';
import host from 'utils/host';

const b = bem(styles);

const mapStateToProps = (state, { lang }) => collectionsSelectors.getData(state, lang);

const CollectionPage = ({ lang, routerQuery: { slug }, collection, articles, authors }) => {
  const metaKeywords = [collection.name, localize(`collection.meta_keywords`, lang)].join(', ');
  return (
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
};

CollectionPage.propTypes = {
  lang: LangType.isRequired,
  routerQuery: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  collection: CollectionShape.isRequired,
  articles: ArticlePreviewArray.isRequired,
  authors: PropTypes.arrayOf(TagShape).isRequired,
};

CollectionPage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { slug } }) => collectionsActions.fetchOne(slug));

export default connect(mapStateToProps)(CollectionPage);
