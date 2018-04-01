import React from 'react';

import Footer from './Footer';
import Header from './Header';
import CoreLayout from './CoreLayout';
import LocaleContext from './LocaleContext';

export default ({ children, title, url }) => (
  <LocaleContext.Provider value={url.query.lang}>
    <CoreLayout title={title}>
      <Header />
      {children}
      <Footer />
    </CoreLayout>
  </LocaleContext.Provider>
);
