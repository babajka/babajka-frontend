import React from 'react';

import Footer from './Footer';
import Header from './Header';
import CoreLayout from './CoreLayout';

// TODO: share `lang` with all tree via Context
export default ({ children, title, url }) => (
  <CoreLayout title={title}>
    <Header lang={url.query.lang} />
    {children}
    <Footer />
  </CoreLayout>
);
