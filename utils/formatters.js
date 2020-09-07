import React, { cloneElement } from 'react';
import identity from 'lodash/identity';
import format from 'date-fns/format';
import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import be from 'date-fns/locale/be';

import { DEFAULT_LOCALE, DATE_FORMAT, SHORT_DATE_FORMAT } from 'constants';

const LOCALES = { en, ru, be };

export const formatOptional = (value, formatter = identity, notAvailable = 'N/A') =>
  value != null ? formatter(value) : notAvailable;

export const optional = (formatter, notAvailable) => value =>
  formatOptional(value, formatter, notAvailable);

export const formatDate = (date, f = DATE_FORMAT) => format(date, f);

export const formatLocalizedDate = (date, l = DEFAULT_LOCALE, f = DATE_FORMAT) =>
  format(date, f, { locale: LOCALES[l] || be });

export const getYear = date => new Date(date).getFullYear();

// WARNING: checks excluding the year
export const isSameDate = date =>
  formatDate(date, SHORT_DATE_FORMAT) === formatDate(new Date(), SHORT_DATE_FORMAT);

export const replaceToDash = string => string.replace(/[_ \\/]+/g, '-').replace(/-+/g, '-');

export const replaceLocale = (url, lang) => url.replace(`/${lang}`, '');

export const toTitleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(s => `${s[0].toUpperCase()}${s.slice(1)}`)
    .join(' ');

export const renderNodeList = (nodes, delimiter = <pr>,&nbsp;</pr>) =>
  !!nodes.length && nodes.reduce((acc, node, key) => [acc, cloneElement(delimiter, { key }), node]);
