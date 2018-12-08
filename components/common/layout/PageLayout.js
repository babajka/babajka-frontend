import React from 'react';

import { DEFAULT_LOCALE } from 'constants';

import Footer from './Footer';
import Header from './Header';
import CoreLayout from './CoreLayout';
import LocaleContext from '../LocaleContext';

export default ({ className, children, title, router, hideFooter }) => (
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
