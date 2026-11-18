// Ported from legacy `utils/features/diary.js` (the parts the main page uses).
import type { Lang } from '@/constants';
import type { DiaryEntry } from '@/lib/types';
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
