import React, { Fragment } from 'react';

import { AuthorModel } from 'utils/customPropTypes';

const Author = ({ displayName, imageUrl }) => (
  <Fragment>
    <img alt={displayName} src={imageUrl} />
    <div className="author-name">
      <span>{displayName}</span>
    </div>
  </Fragment>
);

Author.propTypes = AuthorModel;

export default Author;
