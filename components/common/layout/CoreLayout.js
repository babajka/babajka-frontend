import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import ReactGA from 'react-ga';

import { localize } from 'components/common/Text';
import { GA_ID } from 'constants/social';

class CoreLayout extends Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = { title: '' };

  componentDidMount() {
    ReactGA.initialize(GA_ID, {
      debug: true,
    });
    ReactGA.pageview(document.location.pathname);
  }

  render() {
    const { lang, title, children } = this.props;
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
          <link rel="stylesheet" href="/static/styles/assets.min.css" />
          <link rel="stylesheet" href="/static/styles/bundle.min.css" />
        </Head>
        {children}
      </div>
    );
  }
}

export default CoreLayout;
