import './article.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Text from 'components/common/Text';
import Icon from 'components/common/ui/Icon';

import { TagsArray, CollectionShape, ArticleCoversShape, ArticleType } from 'utils/customPropTypes';
import { renderNodeList } from 'utils/formatters';
import { renderTag } from 'utils/tags';
import { linkCn } from 'utils/ui';

import { ROUTES_NAMES } from 'routes';

import CardWrapper, { SIZES } from './CardWrapper';

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

  return (
    <CardWrapper
      {...wrapperProps}
      className={cn('article-card', {
        'article-card--with-collection': collection,
        'article-card--with-brand': brand,
      })}
    >
      <div
        className={cn('article-card__cover-container', {
          'article-card__cover-container--with-collection': collection,
        })}
      >
        {/* TODO: proper image handling */}
        <img
          className="article-card__cover article-card__cover--vertical"
          src={vertical}
          alt="lol"
        />
        <img
          className="article-card__cover article-card__cover--horizontal"
          src={horizontal}
          alt="lol"
        />
      </div>
      <div className="article-card__content">
        {collection && (
          <div className="article-card__collection-container">
            <div className="article-card__collection-content">
              <div className="article-card__collection-order">
                {collection.articleIndex + 1} <Text id="article.collection-part" />
              </div>
              <div className="article-card__collection-name">{collection.name}</div>
            </div>
            <img className="article-card__collection-cover" src={collection.cover} alt="lol" />
          </div>
        )}
        <div className="article-card__filler article-card__filler--top" />
        <div className="article-card__title">
          {type === 'video' && (
            <Icon className="article-card__interactive-icon" pack="b" name="youtube" />
          )}
          {type === 'audio' && (
            <Icon className="article-card__interactive-icon" pack="s" name="volume-up" />
          )}
          {title}
        </div>
        {!collection && (
          <div className="article-card__description-container">
            <div className="article-card__description">{subtitle}</div>
            <div className={linkCn({ className: 'article-card__label-read', dark })}>
              {type === 'text' && <Text id="article.read" />}
              {type === 'audio' && <Text id="article.listen" />}
              {type === 'video' && <Text id="article.watch" />}
            </div>
          </div>
        )}
        <div className="article-card__filler article-card__filler--middle" />
        <div className="article-card__author-brand">
          {brand && (
            <img
              className="article-card__brand"
              src={brand.content.image}
              alt={brand.content.title}
            />
          )}
          {renderNodeList(authors.map(renderTag))}
        </div>
        <div className="article-card__filler article-card__filler--bottom" />
        <div className="article-card__label-read-full">
          <span className={linkCn({ dark })}>
            {type === 'text' && <Text id="article.read-article" />}
            {type === 'audio' && <Text id="article.listen-podcast" />}
            {type === 'video' && <Text id="article.watch-video" />}
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
