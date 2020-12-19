import styles from 'components/articles/blocks/diary.module.scss';

import React, { useEffect, useState, useCallback } from 'react';
import bem from 'bem-css-modules';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Image from 'components/common/Image';
import DiaryArrows from 'components/specials/diary/DiaryArrows';

import { formatLocalizedDate, getYear, SHORT_DATE_FORMAT } from 'utils/formatters/date';
import fiberyToString from 'utils/fibery/toString';
import { makeRequest } from 'utils/request';
import { getDiary, isNextDiaryAvailable } from 'utils/features/diary';
import api from 'constants/api';

import { DIARY_PICTURE_WIDTH } from 'constants/misc';
import { ROUTES_NAMES } from 'routes';

import BlockWrapper from './BlockWrapper';

const b = bem(styles);

const initialState = {
  data: {
    slug: 'sample',
    date: new Date().getTime(),
  },
};

const getByDay = (month = new Date().getMonth() + 1, day = new Date().getDate()) =>
  makeRequest(api.diary.getByDay(month, day));

const DiaryBlock = ({ lang }) => {
  const [{ month, day }, setFetchProps] = useState({});
  const [{ data, next, prev }, setState] = useState(initialState);
  useEffect(() => {
    getByDay(month, day).then(setState);
  }, [month, day]);

  const diary = getDiary(data, lang);
  const { slug, author: { name, diaryImage } = {}, date, text } = diary;
  const onPrev = useCallback(() => {
    setFetchProps(prev);
  }, [prev]);
  const onNext = useCallback(() => {
    setFetchProps(next);
  }, [next]);

  return (
    <BlockWrapper negativeTop>
      <div className={b('content')}>
        {diaryImage && (
          <Link
            className={b('picture', { 'no-image': !diaryImage })}
            route={ROUTES_NAMES.diary}
            params={{ slug }}
            noStyles
          >
            <Image alt={name} sourceSizes={[DIARY_PICTURE_WIDTH]} baseUrl={diaryImage} mode="x" />
          </Link>
        )}
        <div className={b('text-content')}>
          <div className={b('title')}>
            <span className={b('date')}>{formatLocalizedDate(date, lang, SHORT_DATE_FORMAT)}</span>
            <span>{getYear(date)}</span>
            <span>{name}</span>
            <Text id="diary.wrote" />:
          </div>
          {text && (
            <div className={b('text-wrap')}>
              <Link className={b('text')} route={ROUTES_NAMES.diary} params={{ slug }} noStyles>
                {fiberyToString(text.content)}
              </Link>
              <Link route={ROUTES_NAMES.diary} params={{ slug }}>
                <Text id="diary.more" />
              </Link>
            </div>
          )}
          <DiaryArrows
            className={b('arrows')}
            size={24}
            isNextAvailable={isNextDiaryAvailable({ data, next })}
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>
      </div>
    </BlockWrapper>
  );
};

export default DiaryBlock;
