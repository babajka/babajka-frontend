// Ported from legacy `utils/formatters/date.js`, on date-fns v4.
import { format } from 'date-fns';
import { be, enUS, ru, type Locale } from 'date-fns/locale';

import { DEFAULT_LOCALE, type Lang } from '@/constants';

export const MINSK_TZ_OFFSET = 3;
export const DATE_FORMAT = 'd MMMM yyyy';
export const SHORT_DATE_FORMAT = 'd MMMM';

type DateInput = Date | string | number;

export const getYear = (date: DateInput) => new Date(date).getFullYear();

export const formatDate = (date: Date | number, f = DATE_FORMAT) => format(date, f);

const LOCALES: Record<Lang, Locale> = { en: enUS, ru, be };

export const formatLocalizedDate = (
  date: Date | number,
  lang: Lang = DEFAULT_LOCALE,
  f = DATE_FORMAT
) => format(date, f, { locale: LOCALES[lang] });
