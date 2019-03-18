import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

import 'styles.scss';
import 'styles/src/layout/layout.scss';

const CoreLayout = ({ children, hideFooter }) => (
  <div id="wir-root" className="wir-root">
    <div className="wir-space">
      <Header />

      <div className="wir-content">{children}</div>

      {/* consider to omit this logic */}
      {!hideFooter && <Footer />}

      <div id="wir-overlay" className="wir-overlay" />
    </div>

    <Sidebar />

    <div className="wir-up">{/* <Icon /> */}</div>
  </div>
);

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hideFooter: PropTypes.bool,
};

CoreLayout.defaultProps = {
  hideFooter: false,
};

export default CoreLayout;
