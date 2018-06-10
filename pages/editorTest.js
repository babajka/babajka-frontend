import React from 'react';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';
import Editor from 'components/common/Editor';

import initStore from 'redux/store';

const handeChange = state => {
  console.log(state); // eslint-disable-line no-console
};

const EditorTest = () => (
  <PageLayout title="Editor" url={{ query: { lang: 'be' } }}>
    <Editor onChange={handeChange} />
  </PageLayout>
);

export default withRedux(initStore)(EditorTest);
