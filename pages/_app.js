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

import { replaceLocale } from 'utils/formatters';
import { LangType } from 'utils/customPropTypes';
import host from 'utils/host';
import initStore from 'redux/store';

class Root extends App {
  static propTypes = {
    router: PropTypes.shape({
      query: PropTypes.shape({
        lang: LangType,
      }),
    }).isRequired,
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
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
    const { Component, pageProps, store, router } = this.props;
    const { title } = Component.layoutProps;
    const { lang } = router.query;
    const locale = lang || DEFAULT_LOCALE;
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
              <Component {...pageProps} lang={locale} routerQuery={router.query} />
            </CoreLayout>
          </LocaleContext.Provider>
        </Provider>
      </Container>
    );
  }
}

export default withRouter(withRedux(initStore)(Root));
