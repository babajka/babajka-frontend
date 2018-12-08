import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import ReactGA from 'react-ga';
import moment from 'moment';

import { localize } from 'components/common/Text';
import { MARKUP_URL } from 'constants/server';
import { getGoogleAnalyticsID } from 'constants/social';
import { LangType } from 'utils/customPropTypes';
import { replaceLocale } from 'utils/formatters';
import host from 'utils/host';

import Metatags, { MetaTitle, MetaDescription, MetaImage, MetaLocale } from './Metatags';

class CoreLayout extends Component {
  static propTypes = {
    lang: LangType.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
  };

  static defaultProps = {
    title: 'meta.title',
  };

  componentDidMount() {
    if ((__PROD__ || __STAGING__) && !window.ga) {
      ReactGA.initialize(getGoogleAnalyticsID(__PROD__), {
        debug: false,
      });
      ReactGA.pageview(document.location.pathname);
    }
  }

  render() {
    const { lang, title, children, path } = this.props;
    moment.locale(lang);
    return (
      <div>
        <Metatags url={`${host}${replaceLocale(path)}`} />
        <MetaTitle title={localize(title, lang)} />
        <MetaDescription description={localize('meta.description', lang)} />
        <MetaImage />
        <MetaLocale locale={lang} />
        <Head>
          <title>Wir.by | {localize(title, lang)}</title>
          <link rel="icon" type="image/png" href="/static/images/logo/favicon-colored.png" />
          <link
            rel="stylesheet"
            href={`${__DEBUG_STYLES__ ? MARKUP_URL : ''}/static/styles/bundle.min.css`}
          />
          <link
            rel="stylesheet"
            href={`${__DEBUG_STYLES__ ? MARKUP_URL : ''}/static/styles/assets.min.css`}
          />
        </Head>
        {children}
      </div>
    );
  }
}

export default CoreLayout;
