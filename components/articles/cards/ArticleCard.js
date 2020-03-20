import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import get from 'lodash/get';
import zip from 'lodash/zip';

import Text from 'components/common/Text';
import Image from 'components/common/Image';
import Picture from 'components/common/ui/Picture';
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
import { linkCn, colorLooksBlack, colorLooksWhite } from 'utils/ui';

import { ROUTES_NAMES } from 'routes';
import styles from './articleCard.module.scss';

import { SCREENS, ARTICLE_CARD_SIZES_BY_CONTEXT } from './auto';

import CardWrapper, { SIZES } from './CardWrapper';

const b = bem(styles);

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
    blockContext,
    theme,
    subtitle,
    collection,
    color,
    images,
    title,
    type,
    slug,
    tagsByTopic,
    onBackground,
  } = props;
  const { brands = [], authors = [] } = tagsByTopic;
  const { short, full } = ACTION_BY_TYPE[type];

  return (
    <CardWrapper
      size={size}
      sizeClass={styles[`card-size-${size}`]}
      blockContextClass={blockContext.map(ctx => styles[`block-${ctx}`]).join(' ')}
      theme={theme}
      color={color}
      linkProps={{ route: ROUTES_NAMES.article, params: { slug } }}
      className={cn(
        b({
          'with-collection': !!collection,
          'with-brand': !!brands.length,
          'theme-black': colorLooksBlack(color),
          'theme-white': colorLooksWhite(color),
          'experiment-slavics': !!collection && collection.slug === 'slav-movy',
        })
      )}
      onBackground={onBackground}
    >
      <div className={cn(b('cover-container', { 'with-collection': !!collection }))}>
        {(images.horizontal || images.vertical) &&
          (size === 'auto' ? (
            <Picture
              className={b('cover')}
              sources={zip(SCREENS, get(ARTICLE_CARD_SIZES_BY_CONTEXT, blockContext)).reduce(
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
              className={b('cover')}
              alt={title}
              sourceSizes={[COVER_BY_CARD_SIZE[size].width]}
              baseUrl={images[COVER_BY_CARD_SIZE[size].type]}
              mode="x"
            />
          ))}
      </div>
      <div className={b('content')}>
        {collection && (
          <div className={b('collection-container')}>
            <div className={b('collection-content')}>
              <div className={b('collection-order')}>
                {collection.articleIndex + 1} <Text id="article.collection-part" />
              </div>
              <div className={b('collection-name')}>{collection.name}</div>
            </div>
            {collection.cover && (
              <Image
                className={b('collection-cover')}
                alt={collection.name}
                sourceSizes={[COLLECTION_LOGO_WIDTH]}
                baseUrl={collection.cover}
                mode="x"
              />
            )}
          </div>
        )}
        <div className={b('filler', { top: true })} />
        <div className={b('title')}>
          {ICON_BY_TYPE[type] && <Icon className={b('interactive-icon')} {...ICON_BY_TYPE[type]} />}
          {title}
        </div>
        {!collection && (
          <div className={b('description-container')}>
            <div className={b('description')}>{subtitle}</div>
            <div className={linkCn({ dark: theme === 'light' })}>
              <Text id={`article.${short}`} />
            </div>
          </div>
        )}
        <div className={b('filler', { middle: true })} />
        <div className={b('author-brand')}>
          {brands.map(
            getTagImageRenderer({
              className: b('brand'),
              theme,
            })
          )}
          {renderNodeList(authors.map(renderTag))}
        </div>
        <div className={b('filler', { bottom: true })} />
        <div className={b('label-read-full')}>
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
  blockContext: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string.isRequired,
  theme: ThemeType,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  images: ArticleCoversShape.isRequired,
  tagsByTopic: PropTypes.objectOf(TagsArray).isRequired,
  collection: CollectionShape,
  type: ArticleType.isRequired,
  slug: PropTypes.string.isRequired,
  onBackground: PropTypes.bool,
};

ArticleCard.defaultProps = {
  size: 'auto',
  blockContext: [],
  theme: 'light',
  collection: null,
  onBackground: false,
};

export default ArticleCard;
