import styles from 'styles/pages/diary.module.scss';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';
import bem from 'bem-css-modules';

import Image from 'components/common/Image';
import Redirect from 'components/common/Redirect';
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
import { formatLocalizedDate, getYear, isSameDate } from 'utils/formatters';
import fiberyRenderer from 'utils/fibery/renderer';
import fiberyToString from 'utils/fibery/toString';
import { populateRequest, makeRequest } from 'utils/request';
import { DiaryShape, LangType } from 'utils/customPropTypes';
import { getLocalizedArticles } from 'utils/getters';
import host from 'utils/host';

import { DATE_FORMAT, SHORT_DATE_FORMAT } from 'constants';
import { DIARY_PICTURE_WIDTH } from 'constants/misc';
import { ROUTES_NAMES } from 'routes';
import api from 'constants/api';

const b = bem(styles);

const getShareText = (date, name, lang, content) => {
  const isToday = isSameDate(date);
  const year = getYear(date);

  const base = [
    isToday ? 'Сёння' : `${formatLocalizedDate(date, lang, DATE_FORMAT)} `,
    isToday && year && `, у ${year} годзе, `,
    `${name} ${localize('diary.wrote', lang)}`,
  ]
    .filter(Boolean)
    .join('');

  return {
    basicText: `${base}...`,
    extendedText: `${base}:\n«${content}...»\n`,
  };
};

const mapStateToProps = (state, { lang }) => ({
  diary: diarySelectors.getCurrent(state, lang),
});

const DiaryPage = ({
  diary: { slug, author: { name, diaryImage: image } = {}, date, text: { content } = {} },
  lang,
  routerQuery,
}) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    makeRequest(api.articles.getChunk({ take: 2 })).then(({ data }) => setArticles(data));
  }, []);
  const router = useRouter();
  const metaTitle = `${formatLocalizedDate(date, lang, DATE_FORMAT)}, ${name}`;
  const metaKeywords = [
    formatLocalizedDate(date, lang, SHORT_DATE_FORMAT),
    name,
    localize('diary.meta-keywords', lang),
  ].join(', ');
  const [first, second] = getLocalizedArticles(articles, lang);
  const shortContent = fiberyToString(content).substring(0, 140);

  if (!routerQuery.slug) {
    return <Redirect to={ROUTES_NAMES.diary} params={{ slug }} options={{ shallow: true }} />;
  }

  return (
    <>
      <MetaTitle title={metaTitle} type="article" />
      <MetaDescription description={`${shortContent}...`} />
      <MetaKeywords keywords={metaKeywords} />
      <MetaImage url={image ? `${host}${image}` : DEFAULT_IMAGE} small />

      <div className={cn('wir-content-padding', b())}>
        <DiaryLinkArrows className={b('arrows')} size={36} />
        <div className={b('title', { 'with-image': !!image })}>
          <div>{formatLocalizedDate(date, lang, DATE_FORMAT)}</div>
          <div>{name}</div>
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
          <ShareButtons urlPath={router.asPath} {...getShareText(date, name, lang, shortContent)} />
        </div>
        <DiaryLinkArrows className={b('arrows', { bottom: true })} size={36} />
      </div>

      {!!articles.length && (
        <TwoArticlesInRow className={b('extras')} first={first} second={second} />
      )}
    </>
  );
};

DiaryPage.propTypes = {
  diary: DiaryShape.isRequired,
  lang: LangType.isRequired,
  routerQuery: PropTypes.shape({
    slug: PropTypes.string,
  }).isRequired,
};

DiaryPage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { slug } }) => diaryActions.getBySlug(slug));

export default connect(mapStateToProps)(DiaryPage);
