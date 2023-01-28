import format from 'date-fns/format';
import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import be from 'date-fns/locale/be';

import { DEFAULT_LOCALE } from 'constants';

export const MINSK_TZ_OFFSET = 3;
export const DATE_FORMAT = 'd MMMM yyyy';
export const SHORT_DATE_FORMAT = 'd MMMM';

export const getYear = date => new Date(date).getFullYear();

export const formatDate = (date, f = DATE_FORMAT) => format(date, f);

const LOCALES = { en, ru, be };

export const formatLocalizedDate = (date, l = DEFAULT_LOCALE, f = DATE_FORMAT) =>
  format(date, f, { locale: LOCALES[l] || be });
