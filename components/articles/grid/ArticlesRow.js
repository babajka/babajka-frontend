import React from 'react';

import { ArticlesArray } from 'utils/customPropTypes';

import ArticlePreview from '../ArticlePreview';

const ArticlesRow = ({ articles }) => (
  <div className="articles-row tile is-ancestor">
    {articles && articles.map(article => <ArticlePreview key={article.articleId} {...article} />)}
  </div>
);

ArticlesRow.propTypes = {
  articles: ArticlesArray.isRequired, // eslint-disable-line react/no-typos
};

export default ArticlesRow;
