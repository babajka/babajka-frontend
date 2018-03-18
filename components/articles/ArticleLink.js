import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { ARTICLE_BY_MODE, getArticleUrl } from 'constants/routing';

const ArticleLink = ({ slug, mode, children }) => (
  <Link href={getArticleUrl} as={ARTICLE_BY_MODE[mode](slug)}>
    {children}
  </Link>
);

ArticleLink.propTypes = {
  slug: PropTypes.string,
  children: PropTypes.node.isRequired,
  mode: PropTypes.oneOf(['public', 'edit', 'create']),
};

ArticleLink.defaultProps = {
  slug: null,
  mode: 'public',
};

export default ArticleLink;
