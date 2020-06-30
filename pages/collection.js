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

import { collectionsActions, collectionsSelectors } from 'redux/ducks/collections';
import { ArticlesArray, CollectionShape, LangType } from 'utils/customPropTypes';
import { populateRequest } from 'utils/request';
import host from 'utils/host';

import { ArticlesBlocks } from './tag';

const b = bem(styles);

const mapStateToProps = (state, { lang }) => collectionsSelectors.getData(state, lang);

const CollectionPage = ({ lang, routerQuery: { slug: _ }, collection, blocks, articlesCount }) => {
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
              <div className={b('title')}>{collection.name}</div>
              <span className={b('author')}>AUTHOR</span>
            </div>
          </div>
        </div>
        <ArticlesBlocks articlesCount={articlesCount} blocks={blocks} />
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
  blocks: PropTypes.arrayOf(ArticlesArray).isRequired,
  articlesCount: PropTypes.number.isRequired,
};

CollectionPage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { slug } }) => collectionsActions.fetchOne(slug));

export default connect(mapStateToProps)(CollectionPage);
