import React from 'react';

import { ArticlesModel } from 'utils/customPropTypes';

import ArticlePreview from '../ArticlePreview';

const ArticlesRow = ({ articles }) => (
  <div className="articles-row tile is-ancestor">
    {articles && articles.map(article => <ArticlePreview key={article.articleId} {...article} />)}
  </div>
);

ArticlesRow.propTypes = {
  articles: ArticlesModel.isRequired, // eslint-disable-line react/no-typos
};

export default ArticlesRow;
