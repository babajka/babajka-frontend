import { localize } from 'components/common/Text';
import { formatLocalizedDate, getYear, isSameDate } from 'utils/formatters';
import { getLocalizedTag } from 'utils/getters';
import { getNowHash } from 'utils/time';

import { DATE_FORMAT } from 'constants';

export const getShareText = (date, name, lang, content) => {
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

export const isNextAvailable = ({ data, next }) => {
  if (!next) {
    return false;
  }

  const { month, day } = data;
  const currentHash = +month * 100 + +day;
  return currentHash !== getNowHash();
};
