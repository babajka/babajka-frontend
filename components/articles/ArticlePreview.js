import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ArticlePreview = ({
  title, subtitle, author, className, imageClassName, imagePath, onClick,
}) => (
  <div className={classNames('tile is-parent', className)}>
    <article className="card tile is-child">
      <div className="card-image">
        <figure className={classNames('image', imageClassName)}>
          <a onClick={onClick}>
            <img alt={title} src={imagePath} />
          </a>
        </figure>
      </div>
      <div className="card-content">
        <span className="title is-spaced">
          <a onClick={onClick}>
            {title}
          </a>
        </span>
        <p className="subtitle">{subtitle}</p>
        <p className="subtitle author is-4">{author}</p>
      </div>
    </article>
  </div>
);

ArticlePreview.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  author: PropTypes.string,
  className: PropTypes.string,
  imagePath: PropTypes.string.isRequired,
  imageClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ArticlePreview;
