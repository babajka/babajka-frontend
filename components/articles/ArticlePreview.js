import React from 'react';
import classNames from 'classnames';

import { ArticleModel } from 'utils/customPropTypes';
import { Link, ROUTES_NAMES } from 'routes';
import { DEFAULT_LOCALE } from 'constants';

import SpecialHeading from './SpecialHeading';

const mockImagePath = '/static/images/photo5.jpg';

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
          <Link route={ROUTES_NAMES.article} params={{ slug, lang: DEFAULT_LOCALE }}>
            <a>
              <img alt={title} src={imageUrl || mockImagePath} />
            </a>
          </Link>
        </figure>
        {brand && <SpecialHeading {...brand} />}
      </div>
      <div className="card-content">
        <span className="title is-spaced">
          <Link route={ROUTES_NAMES.article} params={{ slug, lang: DEFAULT_LOCALE }}>
            <a>{title}</a>
          </Link>
        </span>
        <p className="subtitle">{subtitle}</p>
        {author && (
          <div className="author">
            <img alt={title} src={author.imageUrl || mockImagePath} />
            <div className="name">
              {author.firstName.be} {author.lastName.be}
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
