import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { localize } from 'components/common/Text';

const CoreLayout = ({ lang, title, children }) => (
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

CoreLayout.propTypes = {
  lang: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CoreLayout.defaultProps = { title: '' };

export default CoreLayout;
