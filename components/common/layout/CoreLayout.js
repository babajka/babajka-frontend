import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';

import 'styles.scss';
import 'styles/legacy/common.scss';

const CoreLayout = ({ children, hideFooter }) => (
  <>
    <div className="babajka-root">
      <div className="babajka-content">
        <Header />
        {children}
        {!hideFooter && <Footer />}
      </div>
    </div>
    <div id="modal-root" />
  </>
);

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hideFooter: PropTypes.bool,
};

CoreLayout.defaultProps = {
  hideFooter: false,
};

export default CoreLayout;
