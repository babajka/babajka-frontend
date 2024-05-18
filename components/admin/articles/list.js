import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

import ArticleTitle from './fields/title';

const ArticleList = props => (
  <List {...props} perPage={25}>
    <Datagrid>
      <ArticleTitle label="Назва" />
      <TextField source="subtitle" label="Апісанне" />
    </Datagrid>
  </List>
);

export default ArticleList;
