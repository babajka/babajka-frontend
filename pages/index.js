import React, { useMemo } from 'react';

import CardsLayout from 'components/articles/layout/CardsLayout';
import { makeRequest, catchServerErrors } from 'utils/request';
import { localizeData } from 'utils/getters';
import api from 'constants/api';

const MainPage = ({ blocks, data, lang }) => {
  const localized = useMemo(() => localizeData(data, lang), [data, lang]);
  return <CardsLayout blocks={blocks} data={localized} />;
};

MainPage.getLayoutProps = () => ({
  title: 'header.main',
});

const TEN_MINUTES = 10 * 60;

// TODO: use built-in i18n mechanism
export const getStaticProps = catchServerErrors(async () => {
  const { blocks, data } = await makeRequest(api.storage.getMainPage);
  return {
    props: { blocks, data },
    revalidate: TEN_MINUTES,
  };
});

export default MainPage;
