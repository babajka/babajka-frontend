import 'styles/pages/diary.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';

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

import { diaryActions, diarySelectors } from 'redux/ducks/diary';
import { formatDate, getYear, dateIsToday } from 'utils/formatters';
import fiberyRenderer from 'utils/fibery/renderer';
import fiberyToString from 'utils/fibery/toString';
import { populateRequest, makeRequest } from 'utils/request';
import { DiaryShape, LangType } from 'utils/customPropTypes';
import { getLocalizedArticles } from 'utils/getters';
import host from 'utils/host';

import { DATE_FORMAT, SHORT_DATE_FORMAT } from 'constants';
import { DIARY_PICTURE_WIDTH } from 'constants/misc';
import api from 'constants/api';

const mapStateToProps = (state, { lang }) => ({
  diary: diarySelectors.getCurrent(state, lang),
});

const getShareText = (date, name, lang, content) => {
  const today = dateIsToday(date);
  const year = getYear(date);

  const base = [
    today ? 'Сёння' : `${formatDate(date, DATE_FORMAT)} `,
    today && year && `, у ${year} годзе, `,
    `${name} ${localize('diary.wrote', lang)}`,
  ]
    .filter(Boolean)
    .join('');

  return {
    basic: `${base}...`,
    extended: `${base}:\n«${content}...»\n`,
  };
};

const DiaryPage = ({
  diary: { author: { name, diaryImage: image } = {}, date, text: { content } = {} },
  lang,
}) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    makeRequest(api.articles.getChunk({ take: 2 })).then(({ data }) => setArticles(data));
  }, []);
  const router = useRouter();
  const metaTitle = `${formatDate(date, DATE_FORMAT)}, ${name}`;
  const metaKeywords = [
    formatDate(date, SHORT_DATE_FORMAT),
    name,
    localize('diary.meta-keywords', lang),
  ].join(', ');
  const [first, second] = getLocalizedArticles(articles, lang);
  const shortContent = fiberyToString(content).substring(0, 140);

  return (
    <>
      <MetaTitle title={metaTitle} type="article" />
      <MetaDescription description={`${shortContent}...`} />
      <MetaKeywords keywords={metaKeywords} />
      <MetaImage url={image ? `${host}${image}` : DEFAULT_IMAGE} small />

      <div className="wir-content-padding diary-page">
        <DiaryLinkArrows className="diary-page__arrows diary-page__arrows--top" size={36} />
        <div className={cn('diary-page__title', { 'diary-page__title--with-image': image })}>
          <div className="diary-page__date">{formatDate(date, DATE_FORMAT)}</div>
          <div className="diary-page__name">{name}</div>
        </div>
        <div
          className={cn('diary-page__image-container', {
            'diary-page__image-container--no-image': !image,
          })}
        >
          {image && (
            <Image
              className="diary-page__image"
              alt={name}
              sourceSizes={[DIARY_PICTURE_WIDTH]}
              baseUrl={image}
              mode="x"
            />
          )}
        </div>
        <div className="diary-page__text">{fiberyRenderer(content)}</div>
        <div className="diary-page__share">
          <ShareButtons
            urlPath={router.asPath}
            text={getShareText(date, name, lang, shortContent)}
          />
        </div>
        <DiaryLinkArrows className="diary-page__arrows diary-page__arrows--bottom" size={36} />
      </div>

      {!!articles.length && (
        <TwoArticlesInRow className="diary-page-extras" first={first} second={second} />
      )}
    </>
  );
};

DiaryPage.propTypes = {
  diary: DiaryShape.isRequired,
  lang: LangType.isRequired,
};

DiaryPage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { slug } }) => diaryActions.getBySlug(slug));

export default connect(mapStateToProps)(DiaryPage);
