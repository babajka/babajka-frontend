import React from 'react';
import classNames from 'classnames';

import Link from 'components/common/Link';
import { ArticleModel } from 'utils/customPropTypes';
import { ROUTES_NAMES } from 'routes';

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
          <Link route={ROUTES_NAMES.article} params={{ slug }}>
            <a>
              <img alt={title} src={imageUrl || mockImagePath} />
            </a>
          </Link>
        </figure>
        {brand && brand.slug !== 'wir' && <SpecialHeading {...brand} />}
      </div>
      <div className="card-content">
        <span className="title">
          <Link route={ROUTES_NAMES.article} params={{ slug }}>
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
