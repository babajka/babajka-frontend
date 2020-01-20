import './twoInRow.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';
import { ArticleShape } from 'utils/customPropTypes';

import BlockWrapper from './BlockWrapper';

const TwoArticlesInRow = ({ className, first, second }) => (
  <BlockWrapper className={`two-in-row ${className}`}>
    <div className="two-in-row__first">
      <ArticleCard {...first} context={['two-in-row', 'first']} />
    </div>
    <div className="two-in-row__second">
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
