import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import assets from 'babajka-markup/dist/styles/assets.min.css';
import bundle from 'babajka-markup/dist/styles/bundle.min.css';

/* eslint-disable react/no-danger */
const CoreLayout = ({ title, children }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {/* FIXME(@drapegnik) */}
    <style dangerouslySetInnerHTML={{ __html: assets }} />
    <style dangerouslySetInnerHTML={{ __html: bundle }} />
    {children}
  </div>
);

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default CoreLayout;
