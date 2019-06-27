import './article.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/common/Text';
import LinkWrapper from 'components/common/ui/LinkWrapper';
import ConditionalWrapper from 'components/common/ui/ConditionalWrapper';

import { TagShape, CollectionShape, ArticleCoversShape, ArticleType } from 'utils/customPropTypes';
import { renderTag } from 'utils/tags';

import { TOPIC } from 'constants/home';

import CardWrapper, { SQUARE_SIZES, SIZES } from './CardWrapper';
import CollectionCard from './article/CollectionCard';
import VideoCard from './article/VideoCard';

const getArticleCn = square => className => {
  if (!square) {
    return className;
  }
  return `square-${className}`;
};

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
  } = props;
  const square = SQUARE_SIZES.includes(size);
  const articleCn = getArticleCn(square);
  const dark = theme === 'dark';
  const brand = getBrand(tags);
  const wrapperProps = { size, dark, bgColor };

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
    <CardWrapper {...wrapperProps} className={articleCn('article')}>
      <div className={articleCn('article__cover-wrapper')}>
        <img
          className={articleCn('article__cover')}
          src={square ? horizontal : vertical}
          alt={title}
        />
      </div>
      {brand && (
        <img
          className={articleCn('article__brand')}
          src={brand.image}
          alt={brand.title}
          title={brand.title}
        />
      )}
      <div className={articleCn('article__content')}>
        <ConditionalWrapper hide={square}>
          <div className={articleCn('article__title')}>{title}</div>
          <div className={articleCn('article__author')}>
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
                <LinkWrapper dark={dark}>
                  {read}
                  {size === 'm' && article}
                </LinkWrapper>
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
  author: PropTypes.string.isRequired,
  covers: ArticleCoversShape.isRequired,
  tags: PropTypes.arrayOf(TagShape),
  collection: CollectionShape,
  type: ArticleType.isRequired,
};

ArticleCard.defaultProps = {
  theme: 'light',
  tags: [],
  collection: null,
};

export default ArticleCard;
