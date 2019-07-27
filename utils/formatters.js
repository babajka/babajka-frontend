import moment from 'moment';
import identity from 'lodash/identity';

import { DATE_FORMAT } from 'constants';

export const formatOptional = (value, formatter = identity, notAvailable = 'N/A') =>
  value != null ? formatter(value) : notAvailable;

export const optional = (formatter, notAvailable) => value =>
  formatOptional(value, formatter, notAvailable);

export const formatDate = (date, format = DATE_FORMAT) => moment(date).format(format);

export const getYear = date => moment(date).year();

export const replaceToDash = string => string.replace(/[_ \\/]+/g, '-').replace(/-+/g, '-');

export const replaceLocale = (url, lang) => url.replace(`/${lang}`, '');

export const renderNodeList = (nodes, delimiter = ', ') =>
  !!nodes.length && nodes.reduce((acc, node) => [acc, delimiter, node]);

export const toTitleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(s => `${s[0].toUpperCase()}${s.slice(1)}`)
    .join(' ');
