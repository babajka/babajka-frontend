import './article.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import get from 'lodash/get';
import zip from 'lodash/zip';

import Text from 'components/common/Text';
import Image from 'components/common/Image';
import Picture from 'components/common/Picture';
import Icon from 'components/common/ui/Icon';

import {
  TagsArray,
  CollectionShape,
  ArticleCoversShape,
  ArticleType,
  ThemeType,
} from 'utils/customPropTypes';
import { renderNodeList } from 'utils/formatters';
import { renderTag, getTagImageRenderer } from 'utils/tags';
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

const getCoverLink = (images, cardSize) => {
  // TODO: to support 1x and 2x images.
  const { type, width } = COVER_BY_CARD_SIZE[cardSize];
  return `${images[type]}?w=${+width * 2}`;
};

const COLLECTION_LOGO_WIDTH = 70;

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
  const { brands = [], authors = [] } = tagsByTopic;
  const { short, full } = ACTION_BY_TYPE[type];

  return (
    <CardWrapper
      size={size}
      theme={theme}
      color={color}
      linkProps={{ route: ROUTES_NAMES.article, params: { slug } }}
      className={cn('article-card', {
        'article-card--with-collection': collection,
        'article-card--with-brand': !!brands.length,
        'article-card--experiment-slavics': collection && collection.slug === 'slav-movy',
      })}
    >
      <div
        className={cn('article-card__cover-container', {
          'article-card__cover-container--with-collection': collection,
        })}
      >
        {(images.horizontal || images.vertical) &&
          (size === 'auto' ? (
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
            <Image
              className="article-card__cover"
              alt={title}
              sourceSizes={[COVER_BY_CARD_SIZE[size].width]}
              baseUrl={images[COVER_BY_CARD_SIZE[size].type]}
              mode="x"
            />
          ))}
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
            {collection.cover && (
              <Image
                className="article-card__collection-cover"
                alt={collection.name}
                sourceSizes={[COLLECTION_LOGO_WIDTH]}
                baseUrl={collection.cover}
                mode="x"
              />
            )}
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
            <div
              className={linkCn({ className: 'article-card__label-read', dark: theme === 'light' })}
            >
              <Text id={`article.${short}`} />
            </div>
          </div>
        )}
        <div className="article-card__filler article-card__filler--middle" />
        <div className="article-card__author-brand">
          {brands.map(
            getTagImageRenderer({
              className: 'article-card__brand',
              theme,
            })
          )}
          {renderNodeList(authors.map(renderTag))}
        </div>
        <div className="article-card__filler article-card__filler--bottom" />
        <div className="article-card__label-read-full">
          <span className={linkCn({ dark: theme === 'light' })}>
            <Text id={`article.${full}`} />
          </span>
        </div>
      </div>
    </CardWrapper>
  );
};

ArticleCard.propTypes = {
  size: PropTypes.oneOf(SIZES),
  // In case card size is set explicitly, no context needs to be provided.
  // In case card size is 'auto', the context (e.g. the block and position) must be provided.
  context: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string.isRequired,
  theme: ThemeType,
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
  context: [],
  theme: 'light',
  collection: null,
};

export default ArticleCard;
