import React, { Component } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import Text from 'components/common/Text';
import PageLayout from 'components/common/layout/PageLayout';
import EditArticleForm from 'components/articles/EditArticleForm';

import initStore from 'redux/store';
import { actions as articlesActions, selectors } from 'redux/ducks/articles';
import { actions as auth, selectors as authSelectors } from 'redux/ducks/auth';
import request from 'utils/request';
import { LangType } from 'utils/customPropTypes';
import { Router, ROUTES_NAMES } from 'routes';

const mapStateToProps = (state, { router: { query } }) => ({
  article: selectors.getCurrent(state, query.slug),
  articleLocale: query.articleLocale || selectors.getLocaleBySlug(state, query.slug),
  error: selectors.isError(state),
  permissions: authSelectors.getPermissions(state),
});

class EditArticlePage extends Component {
  static propTypes = {
    articleLocale: LangType,
    router: PropTypes.shape({
      query: PropTypes.shape({
        mode: PropTypes.oneOf(['public', 'create', 'edit']),
      }).isRequired,
    }).isRequired,
    permissions: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    articleLocale: null,
  };

  static getInitialProps(ctx) {
    const {
      query: { slug },
    } = ctx;
    return request.populate(
      ctx,
      [auth.getCurrentUser, slug && articlesActions.fetchBySlug.bind(null, slug)].filter(Boolean)
    );
  }

  // FIXME: find better way to close routes
  componentDidMount() {
    const { router, permissions } = this.props;
    const {
      query: { mode, lang, slug },
    } = router;
    if (mode === 'create' && !permissions.canCreateArticle) {
      Router.replaceRoute(ROUTES_NAMES.main, { lang });
    } else if (mode === 'edit' && !permissions.canManageArticles) {
      Router.replaceRoute(ROUTES_NAMES.article, { lang, slug });
    }
  }

  render() {
    const { router, articleLocale, permissions } = this.props;
    const {
      query: { mode },
    } = router;

    if (mode === 'create' && !permissions.canCreateArticle) {
      return (
        <PageLayout className="page-content" router={router} title="header.articles">
          <p className="text is-size-5 has-text-primary">
            <Text id="common.forbidden" />
          </p>
        </PageLayout>
      );
    }

    return (
      <PageLayout className="page-content" router={router} title="header.createArticle">
        <EditArticleForm lang={router.query.lang} articleLocale={articleLocale} mode={mode} />
      </PageLayout>
    );
  }
}

export default withRouter(withRedux(initStore, mapStateToProps)(EditArticlePage));
