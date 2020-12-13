import 'normalize.css';
import 'styles/index.scss';
import 'components/common/layout/layout.scss';

import 'swiper/css/swiper.css';
import 'styles/swiper-customization.scss';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import bem from 'bem-css-modules';
import { Provider } from 'react-redux';

import Head from 'next/head';
import { withRouter } from 'next/router';

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

import { replaceLocale } from 'utils/formatters';
import { LangType } from 'utils/customPropTypes';
import host from 'utils/host';
import loadYM from 'utils/loadYM';
import { useStore } from 'redux/store';

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

const App = ({ Component, router, pageProps: basePageProps }) => {
  const store = useStore();
  const { getLayoutProps = getEmptyObject } = Component;
  const locale = getLocale(router);

  const pageProps = { lang: locale, routerQuery: router.query, ...basePageProps };
  const {
    noLocTitle,
    title: titleId = 'common.project-type',
    titleApple = 'common.project-apple-title',
    hideSidebar,
    hideFooter,
  } = getLayoutProps(pageProps);
  const title = noLocTitle || localize(titleId, locale);

  useEffect(() => {
    const url = document.location.pathname + document.location.search;
    if (process.env.isProd && !window.ym) {
      loadYM(YM_ID);
      window.ym(YM_ID, 'hit', url);
    }
    if (process.env.isProd && !window.ga) {
      ReactGA.initialize(GA_ID, { debug: false });
      ReactGA.ga('send', 'pageview', url, { hitCallback: clearUtmParams });
    }
    if (!process.env.isProd) {
      clearUtmParams();
    }
  }, []);

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
          <Component {...pageProps} />
        </CoreLayout>
      </LocaleContext.Provider>
    </Provider>
  );
};

App.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      lang: LangType,
    }).isRequired,
  }).isRequired,
};

export default withRouter(App);
