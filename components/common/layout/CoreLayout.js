import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import ReactGA from 'react-ga';
import moment from 'moment';

import { localize } from 'components/common/Text';
import { MARKUP_URL } from 'constants/server';
import { getGoogleAnalyticsID } from 'constants/social';

class CoreLayout extends Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = { title: '' };

  componentDidMount() {
    if ((__PROD__ || __STAGING__) && !window.ga) {
      ReactGA.initialize(getGoogleAnalyticsID(__PROD__), {
        debug: false,
      });
      ReactGA.pageview(document.location.pathname);
    }
  }

  render() {
    const { lang, title, children } = this.props;
    moment.locale(lang);
    return (
      <div>
        <Head>
          <title>
            Wir.by {title && '| '}
            {localize(title, lang)}
          </title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="theme-color" content="#1a9582" />
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
