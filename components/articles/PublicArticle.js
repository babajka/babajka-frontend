import React from 'react';
import renderHTML from 'react-render-html';
import { connect } from 'react-redux';

import Link from 'components/common/Link';

import { selectors } from 'redux/ducks/articles';
import { selectors as authSelectors } from 'redux/ducks/auth';
import { ROUTES_NAMES } from 'routes';
import { LOCALES } from 'constants';
import { ArticleModel } from 'utils/customPropTypes';

const mapStateToProps = (state, { articleLocale }) => ({
  canEditArticle: authSelectors.getPermissions(state).canManageArticles, // ??,
  otherLocales: selectors.getOtherLocales(state, articleLocale),
});

const PublicArticle = ({
  articleId,
  title,
  subtitle,
  imageUrl,
  type,
  brand,
  text,
  author,
  articleLocale,
  canEditArticle,
  otherLocales,
}) => (
  <div>
    <h1>
      {canEditArticle && (
        <Link
          route={ROUTES_NAMES.article}
          params={{ slug: articleId, mode: 'edit', articleLocale }}
        >
          <a>Edit Article</a>
        </Link>
      )}
    </h1>
    <h4 className="text is-size-4 has-text-danger">TODO replace stub with real article page</h4>
    <h2 className="text is-size-2 has-text-primary">{title}</h2>
    <h3 className="text is-size-3">{subtitle}</h3>
    <p>
      чытайце таксама на:{' '}
      {otherLocales.map(({ locale, slug, title: t }) => [
        <Link route={ROUTES_NAMES.article} params={{ slug }}>
          <a title={t}>{LOCALES[locale]}</a>
        </Link>,
        ', ',
      ])}
    </p>
    <p>
      {type} article, {brand.name}, {author && `by ${author.displayName}`}
    </p>
    <img alt={title} src={imageUrl} />
    <br />
    {renderHTML(text)}
  </div>
);

PublicArticle.propTypes = ArticleModel;

export default connect(mapStateToProps)(PublicArticle);
