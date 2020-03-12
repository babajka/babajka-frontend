import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import ArticleCard from 'components/articles/cards/ArticleCard';
import { ArticleShape } from 'utils/customPropTypes';
import styles from './twoInRow.module.scss';

import BlockWrapper from './BlockWrapper';

const b = bem(styles);

const TwoArticlesInRow = ({ className, first, second }) => (
  <BlockWrapper className={cn(b(), className)}>
    <div className={b('first')}>
      <ArticleCard {...first} context={['two-in-row', 'first']} />
    </div>
    {/* <div className={b('second')}> */}
    <div>
      <ArticleCard {...second} context={['two-in-row', 'second']} />
    </div>
  </BlockWrapper>
);

TwoArticlesInRow.propTypes = {
  className: PropTypes.string,
  first: ArticleShape.isRequired,
  second: ArticleShape.isRequired,
};

TwoArticlesInRow.defaultProps = {
  className: '',
};

export default TwoArticlesInRow;
