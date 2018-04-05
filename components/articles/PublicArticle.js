import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

import Link from 'components/common/Link';
import { ROUTES_NAMES } from 'routes';

const PublicArticle = ({ slug, text }) => (
  <div>
    <h1>
      <Link route={ROUTES_NAMES.article} params={{ slug, mode: 'edit' }}>
        <a>Edit Article</a>
      </Link>
    </h1>
    {renderHTML(text)}
  </div>
);

PublicArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default PublicArticle;
