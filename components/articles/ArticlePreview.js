import React from 'react';
import classNames from 'classnames';

import articlePropTypes from 'utils/customPropTypes';

const mockImagePath = './static/images/photo5.jpg';

const ArticlePreview = ({
  title,
  subtitle,
  author,
  className,
  imageClassName,
  imagePath,
  onClick,
}) => (
  <div className={classNames('tile is-parent', className)}>
    <article className="card tile is-child">
      <div className="card-image">
        <figure className={classNames('image', imageClassName)}>
          <a onClick={onClick} href="/link/to/article">
            <img alt={title} src={imagePath || mockImagePath} />
          </a>
        </figure>
      </div>
      <div className="card-content">
        <span className="title is-spaced">
          <a onClick={onClick} href="/link/to/article">
            {title}
          </a>
        </span>
        <p className="subtitle">{subtitle}</p>
        <p className="subtitle author is-4">{author}</p>
      </div>
    </article>
  </div>
);

ArticlePreview.propTypes = articlePropTypes;

ArticlePreview.defaultProps = {
  author: '',
  className: '',
  imageClassName: '',
};

export default ArticlePreview;
