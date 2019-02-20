import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import Text from 'components/common/Text';
import EditArticleForm from 'components/articles/EditArticleForm';

import { articlesActions, articlesSelectors } from 'redux/ducks/articles';
import { authSelectors } from 'redux/ducks/auth';
import { populateRequest } from 'utils/request';
import { LangType, PermissionsShape } from 'utils/customPropTypes';
import { Router, ROUTES_NAMES } from 'routes';

const mapStateToProps = (state, { routerQuery: { slug, articleLocale } }) => ({
  article: articlesSelectors.getCurrent(state, slug),
  articleLocale: articleLocale || articlesSelectors.getLocaleBySlug(state, slug),
  error: articlesSelectors.isError(state),
  permissions: authSelectors.getPermissions(state),
});

class EditArticlePage extends Component {
  static propTypes = {
    lang: LangType.isRequired,
    articleLocale: LangType,
    routerQuery: PropTypes.shape({
      mode: PropTypes.oneOf(['create', 'edit']).isRequired,
      slug: PropTypes.string.isRequired,
      articleLocale: PropTypes.string,
    }).isRequired,
    permissions: PermissionsShape.isRequired,
  };

  static defaultProps = {
    articleLocale: null,
  };

  static getLayoutProps = ({ routerQuery: { mode } }) => ({
    title: mode === 'create' ? 'header.createArticle' : 'header.articles',
  });

  static getInitialProps(ctx) {
    const {
      query: { slug, mode },
    } = ctx;
    if (mode === 'edit') {
      return populateRequest(ctx, articlesActions.fetchBySlug.bind(null, slug));
    }
    return {};
  }

  // FIXME: find better way to close routes
  componentDidMount() {
    const {
      permissions,
      routerQuery: { mode, lang, slug },
    } = this.props;

    if (mode === 'create' && !permissions.canCreateArticle) {
      Router.replaceRoute(ROUTES_NAMES.main, { lang });
    } else if (mode === 'edit' && !permissions.canManageArticles) {
      Router.replaceRoute(ROUTES_NAMES.article, { lang, slug });
    }
  }

  render() {
    const {
      lang,
      articleLocale,
      permissions,
      routerQuery: { mode },
    } = this.props;
    const isForbidden = mode === 'create' && !permissions.canCreateArticle;

    return (
      <div className="page-content">
        {isForbidden && (
          <p className="text is-size-5 has-text-primary">
            <Text id="common.forbidden" />
          </p>
        )}
        {!isForbidden && <EditArticleForm lang={lang} articleLocale={articleLocale} mode={mode} />}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(EditArticlePage));
