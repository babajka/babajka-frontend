import React from 'react';
import renderHTML from 'react-render-html';

import Link from 'components/common/Link';

import { ROUTES_NAMES } from 'routes';
import { ArticleModel } from 'utils/customPropTypes';

const PublicArticle = ({ articleId, text, articleLocale }) => (
  <div>
    <h1>
      <Link route={ROUTES_NAMES.article} params={{ slug: articleId, mode: 'edit', articleLocale }}>
        <a>Edit Article</a>
      </Link>
    </h1>
    {renderHTML(text)}
  </div>
);

PublicArticle.propTypes = ArticleModel;

export default PublicArticle;
