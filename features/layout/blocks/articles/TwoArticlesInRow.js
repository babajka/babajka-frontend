import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import ArticleCard from 'features/layout/cards/article';
import { ArticleShape } from 'utils/customPropTypes';
import BlockWrapper from 'features/layout/blocks/wrapper';
import styles from './twoInRow.module.scss';

const b = bem(styles);

const TwoArticlesInRow = ({ className, first, second, inViewport }) => (
  <BlockWrapper className={cn(b(), className)}>
    <div className={b('first')}>
      <ArticleCard
        {...first}
        blockContext={['two-in-row', 'two-in-row__first']}
        inViewport={inViewport}
      />
    </div>
    {/* <div className={b('second')}> */}
    <div>
      <ArticleCard
        {...second}
        blockContext={['two-in-row', 'two-in-row__second']}
        inViewport={inViewport}
      />
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
