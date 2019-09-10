import 'normalize.css';
import 'styles/index.scss';

import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import moment from 'moment';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import App, { Container } from 'next/app';
import Head from 'next/head';
import { withRouter } from 'next/router';

import Guard from 'components/auth/Guard';
import CoreLayout from 'components/common/layout/CoreLayout';
import LocaleContext from 'components/common/LocaleContext';
import Metatags, {
  MetaTitle,
  MetaDescription,
  MetaImage,
  MetaLocale,
  MetaKeywords,
} from 'components/social/Metatags';
import { localize } from 'components/common/Text';

import { DEFAULT_LOCALE, VALID_LOCALES } from 'constants';
import { getGoogleAnalyticsID } from 'constants/social';

import clearUtmParams from 'lib/utils/clearUtmParams';
import { populateRequest } from 'utils/request';
import { replaceLocale } from 'utils/formatters';
import { LangType } from 'utils/customPropTypes';
import host from 'utils/host';
import initStore from 'redux/store';

import { authActions } from 'redux/ducks/auth';
import { sidebarActions } from 'redux/ducks/sidebar';

const getEmptyObject = () => ({});

const getLocale = ({ asPath, query: { lang } }) => {
  // query has 'lang' field if it was successfully matched by the router.
  if (lang) {
    return lang;
  }

  // parse locale for invalid paths (404)
  // asPath starts with '/', so we have to take [1], not [0].
  const parsedLang = asPath.split('/')[1];
  if (VALID_LOCALES.includes(parsedLang)) {
    return parsedLang;
  }

  return DEFAULT_LOCALE;
};

class Root extends App {
  static propTypes = {
    router: PropTypes.shape({
      query: PropTypes.shape({
        lang: LangType,
      }).isRequired,
    }).isRequired,
    isMobile: PropTypes.bool,
  };

  static async getInitialProps({ Component, ctx }) {
    await populateRequest(ctx, authActions.getCurrentUser);
    // TODO(@drapegnik): consider is it right place for that request
    if (!Component.disableSidebarFetch) {
      await populateRequest(ctx, sidebarActions.fetch);
    }
    if (Component.getInitialProps) {
      await Component.getInitialProps(ctx);
    }

    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : '';
    const isMobile = userAgent.includes('Mobi');

    return { isMobile };
  }

  constructor(props) {
    super(props);
    const { router } = props;
    if (router.query) {
      moment.locale(router.query.lang);
    }
  }

  componentDidMount() {
    if ((__PROD__ || __STAGING__) && !window.ga) {
      ReactGA.initialize(getGoogleAnalyticsID(__PROD__), {
        debug: false,
      });
      const url = document.location.pathname + document.location.search;
      ReactGA.ga('send', 'pageview', url, { hitCallback: clearUtmParams });
    }
  }

  render() {
    const { Component, store, router, isMobile } = this.props;
    const { permissions = [], getLayoutProps = getEmptyObject } = Component;
    const locale = getLocale(router);

    const pageProps = { lang: locale, routerQuery: router.query };
    const { title = 'common.project-type', hideSidebar, hideFooter } = getLayoutProps(pageProps);

    return (
      <Container>
        <Provider store={store}>
          <LocaleContext.Provider value={locale}>
            <Metatags url={`${host}${replaceLocale(router.asPath)}`} />
            <MetaTitle title={localize(title, locale)} />
            <MetaDescription description={localize('common.project-description', locale)} />
            <MetaImage />
            <MetaLocale locale={locale} />
            <MetaKeywords />
            <Head>
              <title>Wir.by | {localize(title, locale)}</title>
              <link rel="icon" type="image/png" href="/static/images/logo/favicon-colored.png" />
            </Head>
            <CoreLayout
              lang={locale}
              isMobile={isMobile}
              hideFooter={hideFooter}
              hideSidebar={hideSidebar}
            >
              <Guard permissions={permissions}>
                <Component {...pageProps} />
              </Guard>
            </CoreLayout>
          </LocaleContext.Provider>
        </Provider>
      </Container>
    );
  }
}

export default withRouter(withRedux(initStore)(Root));
