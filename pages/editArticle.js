import React, { Component } from 'react';
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

const mapStateToProps = (state, { url: { query } }) => ({
  article: selectors.getCurrent(state, query.slug),
  articleLocale: query.articleLocale || selectors.getLocaleBySlug(state, query.slug),
  error: selectors.isError(state),
  permissions: authSelectors.getPermissions(state),
});

class EditArticlePage extends Component {
  static getInitialProps(ctx) {
    const { query: { slug } } = ctx;
    return request.populate(
      ctx,
      [auth.getCurrentUser, slug && articlesActions.fetchBySlug.bind(null, slug)].filter(Boolean)
    );
  }

  // FIXME: find better way to close routes
  componentDidMount() {
    const { url, permissions } = this.props;
    const { query: { mode, lang, slug } } = url;
    if (mode === 'create' && !permissions.canCreateArticle) {
      Router.replaceRoute(ROUTES_NAMES.home, { lang });
    } else if (mode === 'edit' && !permissions.canManageArticles) {
      Router.replaceRoute(ROUTES_NAMES.article, { lang, slug });
    }
  }

  render() {
    const { url, articleLocale, permissions } = this.props;
    const { query: { mode } } = url;

    if (mode === 'create' && !permissions.canCreateArticle) {
      return (
        <PageLayout url={url} title="header.home">
          <div className="page-content">
            <p className="text is-size-5 has-text-primary">
              <Text id="common.forbidden" />
            </p>
          </div>
        </PageLayout>
      );
    }

    return (
      <PageLayout url={url} title="header.createArticle">
        <EditArticleForm lang={url.query.lang} articleLocale={articleLocale} mode={mode} />
      </PageLayout>
    );
  }
}

EditArticlePage.propTypes = {
  articleLocale: LangType,
  url: PropTypes.shape({
    query: PropTypes.shape({
      mode: PropTypes.oneOf(['public', 'create', 'edit']),
    }).isRequired,
  }).isRequired,
  permissions: PropTypes.shape({}).isRequired,
};

EditArticlePage.defaultProps = {
  articleLocale: null,
};

export default withRedux(initStore, mapStateToProps)(EditArticlePage);
