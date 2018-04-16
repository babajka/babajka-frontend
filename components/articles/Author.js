import React from 'react';

import { AuthorModel } from 'utils/customPropTypes';

const Author = ({ displayName, imageUrl }) => (
  <div className="author">
    <img alt={displayName} src={imageUrl} />
    <div className="name">{displayName}</div>
  </div>
);

Author.propTypes = AuthorModel;

export default Author;
