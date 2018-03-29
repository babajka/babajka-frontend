import React from 'react';
import classNames from 'classnames';

import { ArticleModel } from 'utils/customPropTypes';

import ArticleLink from './ArticleLink';
import SpecialHeading from './SpecialHeading';

const mockImagePath = './static/images/photo5.jpg';

const ArticlePreview = ({
  slug,
  title,
  subtitle,
  author,
  className,
  imageClassName,
  imagePath,
  brand,
}) => (
  <div className={classNames('tile is-parent', className)}>
    <article className="card tile is-child is-flex">
      <div className="card-image">
        <figure className={classNames('image', imageClassName)}>
          <ArticleLink slug={slug}>
            <img alt={title} src={imagePath || mockImagePath} />
          </ArticleLink>
        </figure>
        {brand && <SpecialHeading {...brand} />}
      </div>
      <div className="card-content">
        <span className="title is-spaced">
          <ArticleLink slug={slug}>{title}</ArticleLink>
        </span>
        <p className="subtitle">{subtitle}</p>
        {author && (
          <div className="author">
            <img alt={title} src={imagePath || mockImagePath} />
            <div className="name">{author}</div>
          </div>
        )}
      </div>
    </article>
  </div>
);

ArticlePreview.propTypes = ArticleModel;

ArticlePreview.defaultProps = {
  author: '',
  className: '',
  imageClassName: '',
};

export default ArticlePreview;
