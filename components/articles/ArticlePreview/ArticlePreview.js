import 'styles/legacy/tiles/tile.scss';

import React from 'react';
import cn from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';

import { localize } from 'components/common/Text';
import Link from 'components/common/Link';
import Icon from 'components/common/ui/Icon';
import LocaleContext from 'components/common/LocaleContext';

import { authSelectors } from 'redux/ducks/auth';
import { ArticleModel } from 'utils/customPropTypes';
import { ROUTES_NAMES } from 'routes';

import SpecialHeading from './SpecialHeading';
import Author from './Author';

const mapStateToProps = state => ({
  canEditArticle: authSelectors.getPermissions(state).canManageArticles,
});

const ArticlePreview = ({
  articleId,
  slug,
  title,
  subtitle,
  author,
  className,
  imageClassName,
  imagePreviewUrl,
  brand,
  publishAt,
  published,
  canEditArticle,
  type,
}) => (
  <LocaleContext.Consumer>
    {lang => (
      <div
        className={cn('tile is-parent', className, {
          'with-opacity': !published,
        })}
        title={published ? '' : localize('article.not-published', lang)}
      >
        <article className="card tile is-child is-flex">
          <div className="card-image">
            <figure className={cn('image', imageClassName)}>
              <Link route={ROUTES_NAMES.article} params={{ slug }}>
                <a>
                  <img alt={title} src={imagePreviewUrl} />
                </a>
              </Link>
            </figure>
            {brand && brand.slug !== 'wir' && <SpecialHeading {...brand} />}
            <div className="actions">
              {canEditArticle && (
                <Link
                  route={ROUTES_NAMES.editArticle}
                  params={{ slug: articleId, mode: 'edit', articleLocale: lang }}
                >
                  <Icon name="pencil" size="lg" />
                </Link>
              )}
            </div>
            {type === 'video' && (
              <Link route={ROUTES_NAMES.article} params={{ slug }}>
                <a className="video-article">
                  <i className="fa fa-play" />
                </a>
              </Link>
            )}
          </div>
          <div className="card-content">
            <span className="title">
              <Link route={ROUTES_NAMES.article} params={{ slug }}>
                <a>{title}</a>
              </Link>
            </span>
            <p className="subtitle">{subtitle}</p>
            <div className="level tile-footer is-mobile">
              <div className="level-left">{author && <Author {...author} />}</div>
              {!published && (
                <div
                  className={cn('level-right', {
                    'publication-scheduled': publishAt,
                    'publication-not-scheduled': !publishAt,
                  })}
                >
                  {publishAt
                    ? moment(publishAt).fromNow()
                    : localize('article.publication-not-scheduled', lang)}
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    )}
  </LocaleContext.Consumer>
);

ArticlePreview.propTypes = ArticleModel;

ArticlePreview.defaultProps = {
  author: null,
  className: '',
  imageClassName: '',
};

export default connect(mapStateToProps)(ArticlePreview);
