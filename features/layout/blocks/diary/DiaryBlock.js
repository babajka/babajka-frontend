import styles from 'features/layout/blocks/diary/diary.module.scss';

import React, { useEffect, useState, useCallback } from 'react';
import bem from 'bem-css-modules';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Image from 'components/common/Image';
import BlockWrapper from 'features/layout/blocks/wrapper';
import DiaryArrows from 'features/diary/DiaryArrows';
import { useDiary } from 'features/diary/store';

import { formatLocalizedDate, getYear, SHORT_DATE_FORMAT } from 'utils/formatters/date';
import fiberyToString from 'utils/fibery/toString';
import { makeRequest } from 'utils/request';
import { getDiary, isNextDiaryAvailable } from 'utils/features/diary';
import api from 'constants/api';

import { DIARY_PICTURE_WIDTH } from 'constants/misc';
import { ROUTES_NAMES } from 'routes';

const b = bem(styles);

const DiaryBlock = ({ lang, inViewport }) => {
  const [{ data, next, prev }, setState] = useDiary();

  const { month, day } = data;
  const [query, setQuery] = useState({ month, day });
  useEffect(() => {
    if (query.day === day && query.month === month) {
      return;
    }
    makeRequest(api.diary.getByDay(query.month, query.day)).then(setState);
  }, [day, month, query, setState]);

  const diary = getDiary(data, lang);
  const { slug, author: { name, diaryImage } = {}, date, text } = diary;
  const onPrev = useCallback(() => {
    setQuery(prev);
  }, [prev]);
  const onNext = useCallback(() => {
    setQuery(next);
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
            <Image
              alt={name}
              sourceSizes={[DIARY_PICTURE_WIDTH]}
              baseUrl={diaryImage}
              mode="x"
              inViewport={inViewport}
            />
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
