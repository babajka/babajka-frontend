import React from 'react';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';

import initStore from 'redux/store';

const PartnersPage = ({ url }) => (
  <PageLayout url={url}>
    <h1>TODO: Partners Page</h1>
  </PageLayout>
);

export default withRedux(initStore)(PartnersPage);
