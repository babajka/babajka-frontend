import './article.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import get from 'lodash/get';
import zip from 'lodash/zip';

import Text from 'components/common/Text';
import Icon from 'components/common/ui/Icon';
import Link from 'components/common/Link';
import Picture from 'components/common/Picture';

import { TagsArray, CollectionShape, ArticleCoversShape, ArticleType } from 'utils/customPropTypes';
import { renderNodeList } from 'utils/formatters';
import { renderTag } from 'utils/tags';
import { linkCn } from 'utils/ui';

import { ROUTES_NAMES } from 'routes';

import { SCREENS, ARTICLE_CARD_SIZES_BY_CONTEXT } from './auto';

import CardWrapper, { SIZES } from './CardWrapper';

const ICON_BY_TYPE = {
  audio: { pack: 's', name: 'volume-up' },
  video: { pack: 'b', name: 'youtube' },
};

const ACTION_BY_TYPE = {
  text: {
    short: 'read',
    full: 'read-article',
  },
  audio: {
    short: 'listen',
    full: 'listen-podcast',
  },
  video: {
    short: 'watch',
    full: 'watch-video',
  },
};

const COVER_BY_CARD_SIZE = {
  xxl: { type: 'vertical', width: 390 },
  xl: { type: 'vertical', width: 313 },
  l: { type: 'vertical', width: 240 },
  m: { type: 'vertical', width: 186 },
  'square-m': { type: 'horizontal', width: 390 },
  'square-s': { type: 'horizontal', width: 300 },
};

// Q: How do I ensure width is a number here?
const getCoverLink = (images, cardSize) =>
  `${images[COVER_BY_CARD_SIZE[cardSize].type]}?w=${COVER_BY_CARD_SIZE[cardSize].width * 2}`;

const BRAND_LOGO_WIDTH = 100;
const COLLECTION_LOGO_WIDTH = 150;

// TODO: fix storybook
const ArticleCard = props => {
  const {
    size,
    context,
    theme,
    subtitle,
    collection,
    color,
    images,
    title,
    type,
    slug,
    tagsByTopic,
  } = props;
  const dark = theme === 'dark';
  const {
    brands: [brand], // Q: what about multiple brands.
    authors,
  } = tagsByTopic;

  return (
    <CardWrapper
      size={size}
      dark={dark}
      color={color}
      linkProps={{ route: ROUTES_NAMES.article, params: { slug } }}
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
        {size === 'auto' ? (
          <Picture
            className="article-card__cover"
            sources={zip(SCREENS, get(ARTICLE_CARD_SIZES_BY_CONTEXT, context)).reduce(
              (acc, [screenName, cardSize]) => {
                acc[screenName] = getCoverLink(images, cardSize);
                return acc;
              },
              {}
            )}
            alt={title}
          />
        ) : (
          <img className="article-card__cover" src={getCoverLink(images, size)} alt={title} />
        )}
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
            <img
              className="article-card__collection-cover"
              src={`${collection.cover}?w=${COLLECTION_LOGO_WIDTH}`}
              alt={collection.name}
            />
          </div>
        )}
        <div className="article-card__filler article-card__filler--top" />
        <div className="article-card__title">
          {ICON_BY_TYPE[type] && (
            <Icon className="article-card__interactive-icon" {...ICON_BY_TYPE[type]} />
          )}
          {title}
        </div>
        {!collection && (
          <div className="article-card__description-container">
            <div className="article-card__description">{subtitle}</div>
            <div className={linkCn({ className: 'article-card__label-read', dark })}>
              <Text id={`article.${ACTION_BY_TYPE[type].short}`} />
            </div>
          </div>
        )}
        <div className="article-card__filler article-card__filler--middle" />
        <div className="article-card__author-brand">
          {brand && (
            <Link
              key={brand.slug}
              route={ROUTES_NAMES.tag}
              params={{ topic: brand.topicSlug, tag: brand.slug }}
            >
              <img
                className="article-card__brand"
                src={`${brand.content.image}?w=${BRAND_LOGO_WIDTH}`}
                alt={brand.content.title}
              />
            </Link>
          )}
          {renderNodeList(authors.map(renderTag))}
        </div>
        <div className="article-card__filler article-card__filler--bottom" />
        <div className="article-card__label-read-full">
          <span className={linkCn({ dark })}>
            <Text id={`article.${ACTION_BY_TYPE[type].full}`} />
          </span>
        </div>
      </div>
    </CardWrapper>
  );
};

ArticleCard.propTypes = {
  size: PropTypes.oneOf(SIZES),
  // Q: I an not sure if the 'context' works as required.
  context: PropTypes.oneOfType([
    // In case card size is set explicitly, no context needs to be provided.
    PropTypes.oneOf(['no']),
    // In case card size is 'auto', the context (e.g. the block and position) must be provided.
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
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
