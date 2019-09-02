import './collection.scss';

import React from 'react';

import Text from 'components/common/Text';

const CollectionCard = ({
  images,
  title,
  author,
  collection: { articleIndex, name, imageUrl },
  brand,
}) => (
  <>
    <div className="collection__cover-wrapper">
      <img className="collection__cover" src={images.horizontal} alt={title} />
    </div>
    {brand}
    <div className="collection__content">
      <div className="collection__content-top">
        <div className="collection__collection">
          {articleIndex + 1} <Text id="article.collection-part" />
          <div className="collection__collection-name">{name}</div>
        </div>
        <img className="collection__aux-image" src={imageUrl} alt={name} title={name} />
      </div>
      <div className="collection__content-bottom">
        <div className="collection__title">{title}</div>
        <div className="collection__author">{author}</div>
      </div>
    </div>
  </>
);

export default CollectionCard;
