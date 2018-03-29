import React from 'react';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/PageLayout';

import initStore from 'redux/store';

const PartnersPage = () => (
  <PageLayout>
    <h1>TODO: Partners Page</h1>
  </PageLayout>
);

export default withRedux(initStore)(PartnersPage);
