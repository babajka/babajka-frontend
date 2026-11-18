'use client';

import { useRef, useState } from 'react';

import DiaryArrows from '@/components/diary/DiaryArrows';
import Image from '@/components/ui/Image';
import Link from '@/components/ui/Link';
import { api } from '@/lib/api';
import { useLang, useT } from '@/lib/i18n/client';
import { routes } from '@/lib/routes';
import type { DiaryDay, DiaryResponse } from '@/lib/types';
import { formatLocalizedDate, getYear, SHORT_DATE_FORMAT } from '@/utils/date';
import { getDiary } from '@/utils/diary';
import { fiberyToString } from '@/utils/fibery/toString';

import BlockWrapper from './BlockWrapper';

const DIARY_PICTURE_WIDTH = 180;

/** Legacy blocks/diary/DiaryBlock.js. The arrows load other days in the browser. */
const DiaryBlock = ({ initial, inViewport }: { initial: DiaryResponse; inViewport?: boolean }) => {
  const lang = useLang();
  const t = useT();
  const [state, setState] = useState(initial);
  const lastRequest = useRef(0);
  // The block opens on today's entry, and there's nothing after today.
  const isToday = state.data.slug === initial.data.slug;

  const load = async (day?: DiaryDay) => {
    if (!day) {
      return;
    }
    lastRequest.current += 1;
    const request = lastRequest.current;
    try {
      const response = await fetch(api.diary.getByDay(day.month, day.day));
      if (!response.ok) {
        throw new Error(`Diary request failed with ${response.status}`);
      }
      const next = (await response.json()) as DiaryResponse;
      // A slower response to an earlier click must not replace the latest day.
      if (request === lastRequest.current) {
        setState(next);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { slug, author, date, text } = getDiary(state.data, lang);
  const { name, diaryImage } = author;
  const href = routes.diary(lang, slug);

  return (
    <BlockWrapper negativeTop>
      <div className="relative mb-[15px] box-content flex flex-col border-b border-grey tablet:flex-row tablet:justify-between tablet-lg:h-[180px] tablet-lg:items-end">
        {diaryImage && (
          <Link
            className="z-[1] mb-[30px] box-content h-[89px] w-full shrink-0 border-b border-grey text-right tablet:order-1 tablet:mb-0 tablet:h-[180px] tablet:w-[180px] tablet:border-b-0 tablet:text-left tablet-lg:pl-5"
            href={href}
            noStyles
          >
            <Image
              className="h-full w-auto"
              alt={name ?? ''}
              size={DIARY_PICTURE_WIDTH}
              baseUrl={diaryImage}
              inViewport={inViewport}
            />
          </Link>
        )}
        <div className="mb-[42px] flex flex-col justify-end tablet:mb-3 tablet-lg:h-[120px] tablet-lg:flex-row tablet-lg:items-start">
          <div className="box-content flex shrink-0 flex-wrap justify-start text-base leading-[21px] font-bold tablet-lg:h-[100px] tablet-lg:w-[220px] tablet-lg:pr-5 tablet-lg:text-xl tablet-lg:leading-[33px] tablet-lg:font-normal [&>span]:mr-[5px] [&>span]:inline-block">
            <span className="font-bold">{formatLocalizedDate(date, lang, SHORT_DATE_FORMAT)}</span>
            <span>{getYear(date)}</span>
            <span>{name}</span>
            {t('diary.wrote')}:
          </div>
          {text && (
            <div className="text-base leading-6">
              <Link className="mb-[5px] line-clamp-3 tablet:mb-0" href={href} noStyles>
                {fiberyToString(text.content)}
              </Link>
              <Link href={href}>{t('diary.more')}</Link>
            </div>
          )}
          <DiaryArrows
            className="absolute -bottom-[15px] left-0 z-[1] box-content w-[60px] bg-white pr-5"
            size={24}
            isNextAvailable={!!state.next && !isToday}
            onPrev={() => load(state.prev)}
            onNext={() => load(state.next)}
          />
        </div>
      </div>
    </BlockWrapper>
  );
};

export default DiaryBlock;
