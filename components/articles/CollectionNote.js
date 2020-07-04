import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';

import { localize } from 'components/common/Text';
import Link from 'components/common/Link';
import Image from 'components/common/Image';

import { CollectionShape, LangType } from 'utils/customPropTypes';

import { ROUTES_NAMES } from 'routes';

import styles from './article.module.scss';

const b = bem(styles);

const CollectionNoteItem = ({ className, hideLink, text, slug }) => (
  <div className={className}>
    {hideLink ? (
      text
    ) : (
      <Link route={ROUTES_NAMES.article} params={{ slug }}>
        {text}
      </Link>
    )}
  </div>
);

CollectionNoteItem.propTypes = {
  className: PropTypes.string.isRequired,
  hideLink: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

const CollectionNote = ({ locale, data: { cover, articleIndex = 0, name, articles, slug } }) => (
  <div className={b('collection')}>
    {cover && (
      <Link route={ROUTES_NAMES.collection} params={{ slug }}>
        <Image
          className={b('collection-cover')}
          alt={name}
          sourceSizes={[70]}
          baseUrl={cover}
          mode="x"
        />
      </Link>
    )}
    <div className={b('collection-items')}>
      <div className={b('collection-item')}>
        {localize('article.this-is-the', locale)} {` ${articleIndex + 1} `}
        {localize('article.of-collection', locale)}
        <br />
        <Link className={b('collection-name')} route={ROUTES_NAMES.collection} params={{ slug }}>
          {name}
        </Link>
      </div>
      {articles.map(({ _id, slug: articleSlug, title }, i) => (
        <CollectionNoteItem
          key={_id}
          className={b('collection-item')}
          hideLink={articleIndex === i}
          text={`${i + 1}. ${title}`}
          slug={articleSlug}
        />
      ))}
    </div>
  </div>
);

CollectionNote.propTypes = {
  data: CollectionShape.isRequired,
  locale: LangType.isRequired,
};

export default CollectionNote;
