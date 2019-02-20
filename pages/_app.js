import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import moment from 'moment';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import App, { Container } from 'next/app';
import Head from 'next/head';
import { withRouter } from 'next/router';

import CoreLayout from 'components/common/layout/CoreLayout';
import LocaleContext from 'components/common/LocaleContext';
import Metatags, {
  MetaTitle,
  MetaDescription,
  MetaImage,
  MetaLocale,
} from 'components/common/Metatags';
import { localize } from 'components/common/Text';

import { DEFAULT_LOCALE } from 'constants';
import { getGoogleAnalyticsID } from 'constants/social';

import { populateRequest } from 'utils/request';
import { replaceLocale } from 'utils/formatters';
import { LangType, UserShape } from 'utils/customPropTypes';
import host from 'utils/host';
import initStore from 'redux/store';

import { authActions } from 'redux/ducks/auth';

const getEmptyObject = () => ({});

class Root extends App {
  static propTypes = {
    router: PropTypes.shape({
      query: PropTypes.shape({
        lang: LangType,
      }).isRequired,
    }).isRequired,
    user: UserShape,
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const [{ user }] = await populateRequest(ctx, authActions.getCurrentUser);
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { user, pageProps };
  }

  componentDidMount() {
    const { router } = this.props;
    if ((__PROD__ || __STAGING__) && !window.ga) {
      ReactGA.initialize(getGoogleAnalyticsID(__PROD__), {
        debug: false,
      });
      ReactGA.pageview(document.location.pathname);
    }
    moment.locale(router.query.lang);
  }

  render() {
    const { Component, pageProps, store, router, user } = this.props;
    const getLayoutProps = Component.getLayoutProps || getEmptyObject;
    const { lang } = router.query;
    const locale = lang || DEFAULT_LOCALE;

    const defaultPageProps = { user, lang: locale, routerQuery: router.query };
    const { title = 'meta.title' } = getLayoutProps(defaultPageProps);

    return (
      <Container>
        <Provider store={store}>
          <LocaleContext.Provider value={locale}>
            <Metatags url={`${host}${replaceLocale(router.asPath)}`} />
            <MetaTitle title={localize(title, locale)} />
            <MetaDescription description={localize('meta.description', locale)} />
            <MetaImage />
            <MetaLocale locale={locale} />
            <Head>
              <title>Wir.by | {localize(title, locale)}</title>
              <link rel="icon" type="image/png" href="/static/images/logo/favicon-colored.png" />
            </Head>
            <CoreLayout {...Component.layoutProps}>
              <Component {...defaultPageProps} {...pageProps} />
            </CoreLayout>
          </LocaleContext.Provider>
        </Provider>
      </Container>
    );
  }
}

export default withRouter(withRedux(initStore)(Root));
