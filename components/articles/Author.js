import React from 'react';

import { AuthorShape } from 'utils/customPropTypes';

const Author = ({ displayName, imageUrl }) => (
  <div className="author">
    <img alt={displayName} src={imageUrl} />
    <div className="name">{displayName}</div>
  </div>
);

Author.propTypes = AuthorShape;

export default Author;
