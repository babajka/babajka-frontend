import './article.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/common/Text';
import ConditionalWrapper from 'components/common/ui/ConditionalWrapper';

import { TagsArray, CollectionShape, ArticleCoversShape, ArticleType } from 'utils/customPropTypes';
import { renderTag } from 'utils/tags';
import { linkCn } from 'utils/ui';

import { TOPIC } from 'constants/misc';
import { ROUTES_NAMES } from 'routes';

import CardWrapper, { SIZES } from './CardWrapper';
import CollectionCard from './article/CollectionCard';
import VideoCard from './article/VideoCard';

const getBrand = tags => {
  const brandTag = tags.find(({ topic }) => topic.slug === 'brands');
  return !!brandTag && brandTag.content;
};

// TODO: fix storybook
const ArticleCard = props => {
  const {
    size,
    theme,
    description,
    tags,
    collection,
    bgColor,
    covers: { horizontal, vertical },
    title,
    type,
    slug,
  } = props;
  const square = size ? size.includes('square') : true;
  const dark = theme === 'dark';
  const brand = getBrand(tags);
  const wrapperProps = {
    size,
    dark,
    bgColor,
    linkProps: { route: ROUTES_NAMES.article, params: { slug } },
  };

  if (type === 'video') {
    return (
      <CardWrapper {...wrapperProps} className="video" bgColor={null}>
        <VideoCard {...props} />
      </CardWrapper>
    );
  }

  if (collection) {
    return (
      <CardWrapper {...wrapperProps} className="collection">
        <CollectionCard {...props} square={square} />
      </CardWrapper>
    );
  }

  const authors = tags.filter(({ topic }) => topic.slug === TOPIC.authors);

  return (
    <CardWrapper {...wrapperProps} className="article">
      <div className="article__cover-wrapper">
        <img className="article__cover" src={square ? horizontal : vertical} alt={title} />
      </div>
      {brand && (
        <img className="article__brand" src={brand.image} alt={brand.title} title={brand.title} />
      )}
      <div className="article__content">
        <ConditionalWrapper hide={square}>
          <div className="article__title">{title}</div>
          <div className="article__author">
            {authors.map((tag, i) => (
              // TODO: extract to `renderList` helper
              <span key={tag.id}>
                {renderTag(tag)}
                {i !== authors.length - 1 && ', '}
              </span>
            ))}
          </div>
        </ConditionalWrapper>
        {!square && (
          <div className="article__content-bottom">
            <span className="article__description">{description}</span>
            <Text
              id="article.read"
              render={(read, article) => (
                <span className={linkCn({ dark })}>
                  {read}
                  {size === 'm' && article}
                </span>
              )}
            />
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

ArticleCard.propTypes = {
  size: PropTypes.oneOf(SIZES).isRequired,
  bgColor: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  covers: ArticleCoversShape.isRequired,
  tags: TagsArray,
  collection: CollectionShape,
  type: ArticleType.isRequired,
  slug: PropTypes.string.isRequired,
};

ArticleCard.defaultProps = {
  theme: 'light',
  tags: [],
  collection: null,
};

export default ArticleCard;
