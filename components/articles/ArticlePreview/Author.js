import React from 'react';

import { AuthorModel } from 'utils/customPropTypes';

const Author = ({ displayName, imageUrl }) => (
  <>
    <img alt={displayName} src={imageUrl} />
    <div className="author-name">
      <span>{displayName}</span>
    </div>
  </>
);

Author.propTypes = AuthorModel;

export default Author;
