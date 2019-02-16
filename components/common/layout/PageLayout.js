import React from 'react';
import PropTypes from 'prop-types';

import { LangType } from 'utils/customPropTypes';
import { DEFAULT_LOCALE } from 'constants';

import Footer from './Footer';
import Header from './Header';
import CoreLayout from './CoreLayout';
import LocaleContext from '../LocaleContext';

const PageLayout = ({ className, children, title, router, hideFooter }) => (
  <LocaleContext.Provider value={router.query.lang || DEFAULT_LOCALE}>
    <CoreLayout title={title} lang={router.query.lang || DEFAULT_LOCALE} path={router.asPath}>
      <>
        <div className="babajka-root">
          <div className="babajka-content">
            <Header />
            <div className={className}>{children}</div>
            {!hideFooter && <Footer />}
          </div>
        </div>
        <div id="modal-root" />
      </>
    </CoreLayout>
  </LocaleContext.Provider>
);

PageLayout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      lang: LangType,
    }),
  }).isRequired,
  hideFooter: PropTypes.bool,
};

PageLayout.defaultProps = {
  className: '',
  title: 'meta.title',
  hideFooter: false,
};

export default PageLayout;
