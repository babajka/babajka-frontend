import React from 'react';

import Footer from './Footer';
import Header from './Header';
import CoreLayout from './CoreLayout';

export default ({ children, title }) => (
  <CoreLayout title={title}>
    <Header />
    {children}
    <Footer />
  </CoreLayout>
);
