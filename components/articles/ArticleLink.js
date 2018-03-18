import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import qs from 'qs';

const LINKS = {
  public: slug => `/article/${slug}`,
  edit: slug => `/article/${slug}/edit`,
  create: () => `/articles/create`,
};

const ArticleLink = ({ slug, mode, children }) => (
  <Link href={`/article?${qs.stringify({ slug, mode })}`} as={LINKS[mode](slug)}>
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
