import React, { useMemo } from 'react';

import CardsLayout from 'components/articles/layout/CardsLayout';
import { makeRequest } from 'utils/request';
import { localizeData } from 'utils/getters';
import api from 'constants/api';

const MainPage = ({ blocks, data, lang }) => {
  const localized = useMemo(() => localizeData(data, lang), [data, lang]);
  return <CardsLayout blocks={blocks} data={localized} />;
};

MainPage.getLayoutProps = () => ({
  title: 'header.main',
});

// TODO: use built-in i18n mechanism
export const getStaticProps = async () => {
  console.warn('home getStaticProps');
  const { blocks, data } = await makeRequest(api.storage.getMainPage);
  return {
    props: { blocks, data },
    revalidate: 1,
  };
};

export default MainPage;
