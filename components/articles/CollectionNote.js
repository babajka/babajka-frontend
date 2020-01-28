import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/common/Text';
import Link from 'components/common/Link';
import Image from 'components/common/Image';

import { CollectionShape } from 'utils/customPropTypes';

import { ROUTES_NAMES } from 'routes';

const CollectionNoteItem = ({ hideLink, text, slug }) => (
  <div className="article-page__collection-item">
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
  hideLink: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

const CollectionNote = ({ data: { cover, articleIndex = 0, name, articles } }) => (
  <div className="article-page__collection">
    {cover && (
      <Image
        className="article-page__collection-cover"
        alt={name}
        sourceSizes={[70]}
        baseUrl={cover}
        mode="x"
      />
    )}
    <div className="article-page__collection-items">
      <div className="article-page__collection-item">
        <Text id="article.this-is-the" /> {` ${articleIndex + 1} `}
        <Text id="article.of-collection" /> <br />
        <span className="article-page__collection-name">{name}</span>
      </div>
      {articles.map(({ _id, slug, title }, i) => (
        <CollectionNoteItem
          key={_id}
          hideLink={articleIndex === i}
          text={`${i + 1}. ${title}`}
          slug={slug}
        />
      ))}
    </div>
  </div>
);

CollectionNote.propTypes = {
  data: CollectionShape.isRequired,
};

export default CollectionNote;
