import React from 'react';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/PageLayout';

import initStore from 'redux/store';

const AboutPage = () => (
  <PageLayout>
    <h1>TODO: About Page</h1>
  </PageLayout>
);

export default withRedux(initStore)(AboutPage);
