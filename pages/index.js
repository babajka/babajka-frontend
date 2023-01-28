import React, { useMemo } from 'react';

import CardBlocksLayout from 'features/layout/card-blocks-layout';
import { DiaryProvider } from 'features/diary/store';

import { makeRequest } from 'utils/request';
import { localizeData } from 'utils/getters';
import { REVALIDATE_TIMEOUT } from 'constants/misc';
import api from 'constants/api';

const MainPage = ({ blocks, data, diary, lang }) => {
  const localized = useMemo(() => localizeData(data, lang), [data, lang]);
  return (
    <DiaryProvider value={diary}>
      <CardBlocksLayout blocks={blocks} data={localized} inViewport />
    </DiaryProvider>
  );
};

MainPage.getLayoutProps = () => ({
  title: 'header.main',
});

// TODO: use built-in i18n mechanism
export const getStaticProps = async () => {
  const { blocks, data } = await makeRequest(api.storage.getMainPage);
  const hasDiary = blocks.some(({ type }) => type === 'diary');

  let diary;
  if (hasDiary) {
    diary = await makeRequest(api.diary.today);
  }

  return {
    props: {
      blocks,
      data,
      diary,
    },
    revalidate: REVALIDATE_TIMEOUT,
  };
};

export default MainPage;
