import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Text from 'components/common/Text';
import LinkWrapper from 'components/common/ui/LinkWrapper';
import ConditionalWrapper from 'components/common/ui/ConditionalWrapper';

import { TagShape, CollectionShape, ArticleCoversShape, ArticleType } from 'utils/customPropTypes';

import CollectionCard from './article/CollectionCard';
import VideoCard from './article/VideoCard';

import 'styles/src/cards/common.scss'; // FIXME
import 'styles/src/cards/article.scss';

const DEFAULT_SIZES = ['xxl', 'xl', 'l', 'm'];
const SQUARE_SIZES = ['square-m', 'square-s'];
export const SIZES = DEFAULT_SIZES.concat(SQUARE_SIZES);

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

const ArticleCardWrapper = ({ className, size, children, bgColor, dark }) => (
  <div className={`size-${size}`}>
    <div className={cn(className, { 'theme-dark': dark })} style={{ backgroundColor: bgColor }}>
      {children}
    </div>
  </div>
);

const ArticleCard = props => {
  const {
    size,
    theme,
    author,
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
      <ArticleCardWrapper {...wrapperProps} className="video" bgColor={null}>
        <VideoCard {...props} />
      </ArticleCardWrapper>
    );
  }

  if (collection) {
    return (
      <ArticleCardWrapper {...wrapperProps} className="collection">
        <CollectionCard {...props} square={square} />
      </ArticleCardWrapper>
    );
  }

  return (
    <ArticleCardWrapper {...wrapperProps} className={articleCn('article')}>
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
          <div className={articleCn('article__author')}>{author}</div>
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
    </ArticleCardWrapper>
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
