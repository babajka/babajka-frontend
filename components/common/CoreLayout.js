import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Footer from 'components/common/Footer';
import Header from 'components/common/Header';

const CoreLayout = ({ title, children }) => (
  <div>
    <Head>
      <title>
        Wir {title && '| '}
        {title}
      </title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/static/styles/assets.min.css" />
      <link rel="stylesheet" href="/static/styles/bundle.min.css" />
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
);

CoreLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CoreLayout.defaultProps = { title: '' };

export default CoreLayout;
