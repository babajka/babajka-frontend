import { localize } from 'components/common/Text';
import {
  formatLocalizedDate,
  getYear,
  formatDate,
  MINSK_TZ_OFFSET,
  SHORT_DATE_FORMAT,
  DATE_FORMAT,
} from 'utils/formatters/date';
import { getLocalizedTag } from 'utils/getters';

const getNowHash = () => {
  const now = new Date();
  // HACK: during ssr we have different timezone
  now.setDate(now.getUTCDate());
  now.setHours(now.getUTCHours() + MINSK_TZ_OFFSET);
  return (now.getMonth() + 1) * 100 + now.getDate();
};

// WARNING: checks excluding the year
const isSameDate = date =>
  formatDate(date, SHORT_DATE_FORMAT) === formatDate(new Date(), SHORT_DATE_FORMAT);

export const getDiaryShareText = (date, name, lang, content) => {
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

export const getDiary = ({ author, text = {}, date, day, month, year, slug }, lang) => ({
  author: author ? getLocalizedTag(author, lang).content : {},
  text,
  slug,
  date: date || new Date(year, month - 1, day).getTime(),
  day,
  month,
});

export const isNextDiaryAvailable = ({ data, next }) => {
  if (!next) {
    return false;
  }

  const { month, day } = data;
  const currentHash = +month * 100 + +day;
  return currentHash !== getNowHash();
};
