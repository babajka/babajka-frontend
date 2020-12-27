import React, { useMemo } from 'react';

import CardBlocksLayout from 'features/layout/card-blocks-layout';
import { makeRequest } from 'utils/request';
import { localizeData } from 'utils/getters';
import { REVALIDATE_TIMEOUT } from 'constants/misc';
import api from 'constants/api';

const MainPage = ({ blocks, data, lang }) => {
  const localized = useMemo(() => localizeData(data, lang), [data, lang]);
  return <CardBlocksLayout blocks={blocks} data={localized} />;
};

MainPage.getLayoutProps = () => ({
  title: 'header.main',
});

// TODO: use built-in i18n mechanism
export const getStaticProps = async () => {
  const { blocks, data } = await makeRequest(api.storage.getMainPage);
  return {
    props: { blocks, data },
    revalidate: REVALIDATE_TIMEOUT,
  };
};

export default MainPage;
