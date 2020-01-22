import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/common/Text';
import Link from 'components/common/Link';
import Image from 'components/common/Image';

import { CollectionShape } from 'utils/customPropTypes';

import { ROUTES_NAMES } from 'routes';

const CollectionArticleLink = ({ slug, title, index }) => (
  <div className="article-page__collection-item">
    <Link route={ROUTES_NAMES.article} params={{ slug }}>
      {index}. {title}
    </Link>
  </div>
);

CollectionArticleLink.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const CollectionNote = ({ data: { cover, articleIndex = 0, name, prev, next } }) => {
  const index = articleIndex + 1;
  return (
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
          <Text id="article.this-is-the" /> {` ${index} `}
          <Text id="article.of-collection" /> <br />
          <span className="article-page__collection-name">{name}</span>
        </div>
        {prev && <CollectionArticleLink {...prev} index={index - 1} />}
        {next && <CollectionArticleLink {...next} index={index + 1} />}
      </div>
    </div>
  );
};

CollectionNote.propTypes = {
  data: CollectionShape.isRequired,
};

export default CollectionNote;
