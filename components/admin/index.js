import React from 'react';
import { Admin as ReactAdmin, Resource } from 'react-admin';

import ArticleList from './articles/list';
import authProvider from './auth-provider';
import dataProvider from './data-provider';

const Admin = () => {
  return (
    <ReactAdmin
      //   dashboard={Dashboard}
      //   layout={Layout}
      authProvider={authProvider}
      dataProvider={dataProvider}
      //   i18nProvider={i18nProvider}
    >
      <Resource name="articles" list={ArticleList} />
    </ReactAdmin>
  );
};

export default Admin;
