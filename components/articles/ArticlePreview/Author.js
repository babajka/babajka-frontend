import React from 'react';

const Author = ({ displayName, imageUrl }) => (
  <>
    <img alt={displayName} src={imageUrl} />
    <div className="author-name">
      <span>{displayName}</span>
    </div>
  </>
);

export default Author;
