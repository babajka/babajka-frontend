// Ported from legacy `utils/features/diary.js` (the parts the main page uses).
import type { Lang } from '@/constants';
import type { DiaryDay, DiaryEntry } from '@/lib/types';
import { DATE_FORMAT, formatLocalizedDate, getYear, MINSK_TZ_OFFSET } from '@/utils/date';
import { getLocalizedTag } from '@/utils/getters';

type DiaryAuthor = { name?: string; diaryImage?: string };

export const getDiary = (
  { author, text, date, day, month, year, slug }: DiaryEntry,
  lang: Lang
) => ({
  author: (author ? getLocalizedTag(author, lang).content : {}) as DiaryAuthor,
  text,
  slug,
  date: date ?? new Date(year, Number(month) - 1, Number(day)).getTime(),
});

/** Month and day in Minsk: the diary changes at midnight there. */
export const getMinskDay = (now: Date) => {
  const minsk = new Date(now.getTime() + MINSK_TZ_OFFSET * 60 * 60 * 1000);
  return { month: minsk.getUTCMonth() + 1, day: minsk.getUTCDate() };
};

const getDayHash = ({ month, day }: { month: number | string; day: number | string }) =>
  Number(month) * 100 + Number(day);

/** The entry is for today's date, in any year. */
export const isTodayDiary = (entry: Pick<DiaryDay, 'month' | 'day'>, now: Date) =>
  getDayHash(entry) === getDayHash(getMinskDay(now));

/** There's no entry after today, even though the backend returns the next day of the calendar. */
export const isNextDiaryAvailable = (
  entry: Pick<DiaryDay, 'month' | 'day'>,
  next: DiaryDay | undefined,
  now: Date
) => !!next && !isTodayDiary(entry, now);

type ShareTextOptions = {
  date: number;
  name?: string;
  lang: Lang;
  wrote: string;
  content: string;
  isToday: boolean;
};

export const getDiaryShareText = ({
  date,
  name,
  lang,
  wrote,
  content,
  isToday,
}: ShareTextOptions) => {
  const when = isToday
    ? `Сёння, у ${getYear(date)} годзе, `
    : `${formatLocalizedDate(date, lang, DATE_FORMAT)} `;
  const base = `${when}${name} ${wrote}`;
  return { basicText: `${base}...`, extendedText: `${base}:\n«${content}...»\n` };
};
