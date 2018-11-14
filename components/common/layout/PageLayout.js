import React from 'react';

import { DEFAULT_LOCALE } from 'constants';

import Footer from './Footer';
import Header from './Header';
import CoreLayout from './CoreLayout';
import LocaleContext from '../LocaleContext';

export default ({ className, children, title, url, hideFooter }) => (
  <LocaleContext.Provider value={url.query.lang || DEFAULT_LOCALE}>
    <CoreLayout title={title} lang={url.query.lang || DEFAULT_LOCALE} path={url.asPath}>
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
