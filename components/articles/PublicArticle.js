import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import renderHTML from 'react-render-html';

const PublicArticle = ({ slug, text }) => (
  <div>
    <h1>
      <Link href={`/article?slug=${slug}&mode=edit`} as={`/article/${slug}/edit`}>
        Edit
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
