import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

import Button from 'components/common/Button';
import ArticleLink from './ArticleLink';

const PublicArticle = ({ slug, text }) => (
  <div>
    <h1>
      <ArticleLink slug={slug} mode="edit">
        <Button>Edit Article</Button>
      </ArticleLink>
    </h1>
    {renderHTML(text)}
  </div>
);

PublicArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default PublicArticle;
