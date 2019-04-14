import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Text from 'components/common/Text';
import ConditionalWrapper from 'components/common/ui/ConditionalWrapper';

import { TagShape } from 'utils/customPropTypes';

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
  return brandTag && brandTag.content;
};

const ArticleCard = ({ size, theme, bgColor, cover, title, author, description, tags }) => {
  const square = SQUARE_SIZES.includes(size);
  const articleCn = getArticleCn(square);
  const dark = theme === 'dark';
  const brand = getBrand(tags);
  return (
    <div className={`size-${size}`}>
      <div
        className={cn(articleCn('article'), { 'theme-dark': dark })}
        style={{ backgroundColor: bgColor }}
      >
        <div className={articleCn('article__cover-wrapper')}>
          <img className={articleCn('article__cover')} src={cover} alt={title} />
        </div>
        {!!brand && (
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
                  <span className={cn('article__read', { 'theme-dark': dark })}>
                    {read}
                    {size === 'm' && article}
                  </span>
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  size: PropTypes.oneOf(SIZES).isRequired,
  bgColor: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(TagShape),
};

ArticleCard.defaultProps = {
  theme: 'light',
  tags: [],
};

export default ArticleCard;
