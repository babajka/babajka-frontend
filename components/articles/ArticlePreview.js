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
  imageUrl,
  brand,
}) => (
  <div className={classNames('tile is-parent', className)}>
    <article className="card tile is-child is-flex">
      <div className="card-image">
        <figure className={classNames('image', imageClassName)}>
          <ArticleLink slug={slug}>
            <a>
              <img alt={title} src={imageUrl || mockImagePath} />
            </a>
          </ArticleLink>
        </figure>
        {brand && <SpecialHeading {...brand} />}
      </div>
      <div className="card-content">
        <span className="title is-spaced">
          <ArticleLink slug={slug}>
            <a>{title}</a>
          </ArticleLink>
        </span>
        <p className="subtitle">{subtitle}</p>
        {author && (
          <div className="author">
            <img alt={title} src={author.imageUrl || mockImagePath} />
            <div className="name">
              {author.firstName} {author.lastName}
            </div>
          </div>
        )}
      </div>
    </article>
  </div>
);

ArticlePreview.propTypes = ArticleModel;

ArticlePreview.defaultProps = {
  author: null,
  className: '',
  imageClassName: '',
};

export default ArticlePreview;
