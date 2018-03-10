import React from 'react';
import PropTypes from 'prop-types';
import articlePropTypes from 'utils/customPropTypes';
import ArticleRow from './ArticlesRow';
import Diary from '../Diary';

const ArticlesComplexRow = ({ articles }) => (
  <div className="second-line tile is-ancestor">
    <div className="tile is-vertical is-8">
      <ArticleRow articles={articles.slice(0, 3)} />
      <ArticleRow articles={articles.slice(0, 3)} />
    </div>

    <div className="tile is-vertical">
      <Diary {...articles[0]} text={articles[0].locales.be.text} />
    </div>
  </div>
);

ArticlesComplexRow.propTypes = {
  articles: PropTypes.arrayOf(articlePropTypes).isRequired,
};

export default ArticlesComplexRow;
