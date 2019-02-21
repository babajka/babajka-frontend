import moment from 'moment';

import { DATE_FORMAT } from 'constants';

export const formatDate = (date, format = DATE_FORMAT) => moment(date).format(format);

export const replaceToDash = string => string.replace(/[_ \\/]+/g, '-').replace(/-+/g, '-');

export const replaceLocale = (url, lang) => url.replace(`/${lang}`, '');
