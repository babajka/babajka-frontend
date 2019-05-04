import React from 'react';
import PropTypes from 'prop-types';

import ScreenContext from 'components/common/layout/ScreenContext';
import ArticleCard from 'components/articles/cards/ArticleCard';

import { SCREENS } from 'constants/styles';

const { DESKTOP, MOBILE, TABLET, TABLET_LARGE, TOUCH } = SCREENS;

const CARD_SIZE = {
  [DESKTOP]: 'xxl',
  [TABLET_LARGE]: 'xl',
  [TABLET]: 'l',
  [TOUCH]: 'm',
  [MOBILE]: 'square-s',
};

const FeaturedBlock = ({ block, data }) => {
  const { articleId, frozen } = block;
  const { articles, latestArticles } = data;
  const articleData = frozen ? articles[articleId] : latestArticles[0];
  return (
    <div className="block block__no-background">
      <ScreenContext.Consumer>
        {({ screen }) => <ArticleCard {...articleData} size={CARD_SIZE[screen]} />}
      </ScreenContext.Consumer>
    </div>
  );
};

FeaturedBlock.propTypes = {
  block: PropTypes.shape({
    articleId: PropTypes.string,
    frozen: PropTypes.bool.isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default FeaturedBlock;
