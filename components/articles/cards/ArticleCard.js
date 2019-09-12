import './article.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/common/Text';

import { TagsArray, CollectionShape, ArticleCoversShape, ArticleType } from 'utils/customPropTypes';
import { renderNodeList } from 'utils/formatters';
import { renderTag } from 'utils/tags';
import { linkCn } from 'utils/ui';

import { ROUTES_NAMES } from 'routes';

import CardWrapper, { SIZES } from './CardWrapper';
import CollectionCard from './article/CollectionCard';
import VideoCard from './article/VideoCard';

// TODO: fix storybook
const ArticleCard = props => {
  const {
    size,
    theme,
    subtitle,
    collection,
    color,
    images: { horizontal, vertical },
    title,
    type,
    slug,
    tagsByTopic,
  } = props;
  const dark = theme === 'dark';
  const {
    brands: [brand],
    authors,
  } = tagsByTopic;
  const wrapperProps = {
    size,
    dark,
    color,
    linkProps: { route: ROUTES_NAMES.article, params: { slug } },
  };

  if (type === 'video') {
    return (
      <CardWrapper {...wrapperProps} className="video" color={null}>
        <VideoCard {...props} />
      </CardWrapper>
    );
  }

  if (collection) {
    return (
      <CardWrapper {...wrapperProps} className="collection">
        <CollectionCard {...props} />
      </CardWrapper>
    );
  }

  return (
    <CardWrapper {...wrapperProps} className="article">
      <div className="article__cover-wrapper">
        <img className="article__cover article__cover--vertical" src={vertical} alt={title} />
        <img className="article__cover article__cover--horizontal" src={horizontal} alt={title} />
      </div>
      {brand && (
        <img className="article__brand" src={brand.image} alt={brand.title} title={brand.title} />
      )}
      <div className="article__content">
        <div>
          <div className="article__title">{title}</div>
          <div className="article__author">{renderNodeList(authors.map(renderTag))}</div>
        </div>
        <div className="article__content-bottom">
          <span className="article__description">{subtitle}</span>
          <span className={linkCn({ className: 'article__label-read', dark })}>
            <Text id="article.read" />
          </span>
          <span className="article__label-read-article">
            <span className={linkCn({ dark })}>
              <Text id="article.read-article" />
            </span>
          </span>
        </div>
      </div>
    </CardWrapper>
  );
};

ArticleCard.propTypes = {
  size: PropTypes.oneOf(SIZES),
  color: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  images: ArticleCoversShape.isRequired,
  tagsByTopic: PropTypes.objectOf(TagsArray).isRequired,
  collection: CollectionShape,
  type: ArticleType.isRequired,
  slug: PropTypes.string.isRequired,
};

ArticleCard.defaultProps = {
  size: 'auto',
  theme: 'light',
  collection: null,
};

export default ArticleCard;
