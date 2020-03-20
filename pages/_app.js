import 'normalize.css';
import 'styles/index.scss';
import 'components/common/ui/link.scss';
import 'components/common/layout/layout.scss';

import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import moment from 'moment';
import bem from 'bem-css-modules';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import App from 'next/app';
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
  MetaAppleTouchDevices,
} from 'components/social/Metatags';
import { localize } from 'components/common/Text';

import { DEFAULT_LOCALE, VALID_LOCALES } from 'constants';
import { GA_ID, YM_ID } from 'constants/social';
import { FAVICON_URL } from 'constants/assets';

import clearUtmParams from 'lib/utils/clearUtmParams';
import { populateRequest } from 'utils/request';
import { replaceLocale } from 'utils/formatters';
import { LangType } from 'utils/customPropTypes';
import host from 'utils/host';
import initStore from 'redux/store';
import loadYM from 'utils/loadYM';

import { authActions } from 'redux/ducks/auth';
import { sidebarActions } from 'redux/ducks/sidebar';

bem.setSettings({
  throwOnError: true,
  modifierDelimiter: '--',
});

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
  };

  // https://err.sh/next.js/opt-out-automatic-prerendering
  static async getInitialProps({ Component, ctx }) {
    await populateRequest(ctx, authActions.getCurrentUser);
    // TODO(@drapegnik): consider is it right place for that request
    if (!Component.disableSidebarFetch) {
      await populateRequest(ctx, sidebarActions.fetch);
    }
    const props = {};
    if (Component.getInitialProps) {
      props.initial = await Component.getInitialProps(ctx);
    }
    return props;
  }

  constructor(props) {
    super(props);
    this.setMoment();
  }

  setMoment() {
    const {
      router: {
        query: { lang },
      },
    } = this.props;
    if (moment.locale() !== lang) {
      moment.locale(lang);
    }
  }

  componentDidMount() {
    const url = document.location.pathname + document.location.search;
    if (__PROD__ && !window.ym) {
      loadYM(YM_ID);
      window.ym(YM_ID, 'hit', url);
    }
    if (__PROD__ && !window.ga) {
      ReactGA.initialize(GA_ID, { debug: false });
      ReactGA.ga('send', 'pageview', url, { hitCallback: clearUtmParams });
    }
    if (!__PROD__) {
      clearUtmParams();
    }
  }

  render() {
    const { Component, store, router, initial } = this.props;
    const { permissions = [], getLayoutProps = getEmptyObject } = Component;
    const locale = getLocale(router);
    this.setMoment();

    const pageProps = { lang: locale, routerQuery: router.query, ...initial };
    const {
      noLocTitle,
      title: titleId = 'common.project-type',
      titleApple = 'common.project-apple-title',
      hideSidebar,
      hideFooter,
    } = getLayoutProps(pageProps);
    const title = noLocTitle || localize(titleId, locale);

    return (
      <Provider store={store}>
        <LocaleContext.Provider value={locale}>
          <Metatags url={`${host}${replaceLocale(router.asPath)}`} />
          <MetaTitle title={title} />
          <MetaDescription description={localize('common.project-description', locale)} />
          <MetaImage />
          <MetaLocale locale={locale} />
          <MetaKeywords />
          <MetaAppleTouchDevices title={localize(titleApple, locale)} />
          <Head>
            <link rel="icon" type="image/png" href={FAVICON_URL} />
            {/* https://developers.google.com/search/reference/podcast/homepage-requirements */}
            {/* <link
              rel="alternate"
              type="application/rss+xml"
              title="Wir.by Podcasts"
              href="https://wir.by/rss/podcasts"
            /> */}
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${YM_ID}`}
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt=""
                />
              </div>
            </noscript>
          </Head>
          <CoreLayout lang={locale} hideFooter={hideFooter} hideSidebar={hideSidebar}>
            <Guard permissions={permissions}>
              <Component {...pageProps} />
            </Guard>
          </CoreLayout>
        </LocaleContext.Provider>
      </Provider>
    );
  }
}

export default withRouter(withRedux(initStore)(Root));
