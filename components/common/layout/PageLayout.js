import React from 'react';

import Footer from './Footer';
import Header from './Header';
import CoreLayout from './CoreLayout';
import LocaleContext from '../LocaleContext';

export default ({ className, children, title, url }) => (
  <LocaleContext.Provider value={url.query.lang}>
    <CoreLayout title={title} lang={url.query.lang}>
      <div className="babajka-root">
        <div className="babajka-content">
          <Header />
          <div className={className}>{children}</div>
          <Footer />
        </div>
      </div>
    </CoreLayout>
  </LocaleContext.Provider>
);
