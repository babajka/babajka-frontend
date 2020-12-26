import styles from 'styles/pages/diary.module.scss';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import bem from 'bem-css-modules';

import Image from 'components/common/Image';
import { localize } from 'components/common/Text';
import DiaryLinkArrows from 'components/specials/diary/DiaryLinkArrows';
import ShareButtons from 'components/social/ShareButtons';
import {
  MetaTitle,
  MetaDescription,
  MetaKeywords,
  MetaImage,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';
import TwoArticlesInRow from 'components/articles/blocks/TwoArticlesInRow';

import { formatLocalizedDate, DATE_FORMAT, SHORT_DATE_FORMAT } from 'utils/formatters/date';
import fiberyRenderer from 'utils/fibery/renderer';
import fiberyToString from 'utils/fibery/toString';
import { makeRequest, catchServerSideErrors } from 'utils/request';
import { getLocalizedArticles } from 'utils/getters';
import { getDiary, getDiaryShareText, isNextDiaryAvailable } from 'utils/features/diary';
import host from 'utils/host';

import { Router, ROUTES_NAMES } from 'routes';
import { DIARY_PICTURE_WIDTH } from 'constants/misc';
import api from 'constants/api';

const b = bem(styles);

const DiaryPage = ({
  diary: {
    slug,
    author: { name, diaryImage: image },
    date,
    text: { content },
  },
  articles,
  metaTitle,
  metaKeywords,
  shortContent,
  basicShareText,
  extendedShareText,
  lang,
  arrowProps,
}) => {
  const router = useRouter();
  const {
    query: { slug: routerSlug },
  } = router;
  const [first, second] = articles;

  useEffect(() => {
    if (!routerSlug) {
      Router.replaceRoute(ROUTES_NAMES.diary, { lang, slug }, { shallow: true });
    }
  }, [lang, routerSlug, slug]);

  return (
    <>
      <MetaTitle title={metaTitle} type="article" />
      <MetaDescription description={`${shortContent}...`} />
      <MetaKeywords keywords={metaKeywords} />
      <MetaImage url={image ? `${host}${image}` : DEFAULT_IMAGE} small />

      <div className={cn('wir-content-padding', b())}>
        <DiaryLinkArrows className={b('arrows')} size={36} {...arrowProps} />
        <div className={b('title', { 'with-image': !!image })}>
          <h1>{formatLocalizedDate(date, lang, DATE_FORMAT)}</h1>
          <h1>{name}</h1>
        </div>
        <div className={b('image-container', { 'no-image': !image })}>
          {image && (
            <Image
              className={b('image')}
              alt={name}
              sourceSizes={[DIARY_PICTURE_WIDTH]}
              baseUrl={image}
              mode="x"
            />
          )}
        </div>
        <div className={b('text')}>{fiberyRenderer(content)}</div>
        <div className={b('share')}>
          <ShareButtons
            className={b('share')}
            basicText={basicShareText}
            extendedText={extendedShareText}
          />
        </div>
        <DiaryLinkArrows className={b('arrows', { bottom: true })} size={36} {...arrowProps} />
      </div>

      {!!articles.length && (
        <TwoArticlesInRow className={b('extras')} first={first} second={second} />
      )}
    </>
  );
};

// TODO: replace with SSG after migration from `next-routes`
export const getServerSideProps = catchServerSideErrors(async ({ query: { slug, lang } }) => {
  const url = slug ? api.diary.getBySlug(slug) : api.diary.today;

  const { data, prev, next } = await makeRequest(url);
  const { data: articles } = await makeRequest(api.articles.getChunk({ take: 2 }));

  const diary = getDiary(data, lang);
  const {
    author: { name },
    date,
    text,
  } = diary;

  const metaTitle = `${formatLocalizedDate(date, lang, DATE_FORMAT)}, ${name}`;
  const metaKeywords = [
    formatLocalizedDate(date, lang, SHORT_DATE_FORMAT),
    name,
    localize('diary.meta-keywords', lang),
  ].join(', ');
  const shortContent = fiberyToString(text.content).substring(0, 140);
  const shareData = getDiaryShareText(date, name, lang, shortContent);

  return {
    props: {
      diary,
      articles: getLocalizedArticles(articles, lang),
      metaTitle,
      metaKeywords,
      shortContent,
      basicShareText: shareData.basicText,
      extendedShareText: shareData.extendedText,
      arrowProps: { prev, next, isNextAvailable: isNextDiaryAvailable({ data, next }) },
    },
  };
});

export default DiaryPage;
