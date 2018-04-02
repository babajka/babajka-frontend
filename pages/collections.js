import React from 'react';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';

import initStore from 'redux/store';

const CollectionsPage = ({ url }) => (
  <PageLayout url={url}>
    <h1>TODO: Collections Page</h1>
  </PageLayout>
);

export default withRedux(initStore)(CollectionsPage);
