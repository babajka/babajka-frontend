import React, { cloneElement } from 'react';
import moment from 'moment';
import identity from 'lodash/identity';

import { DATE_FORMAT, SHORT_DATE_FORMAT } from 'constants';

export const formatOptional = (value, formatter = identity, notAvailable = 'N/A') =>
  value != null ? formatter(value) : notAvailable;

export const optional = (formatter, notAvailable) => value =>
  formatOptional(value, formatter, notAvailable);

export const formatDate = (date, format = DATE_FORMAT) => moment(date).format(format);

export const getYear = date => moment(date).year();

export const dateIsToday = date =>
  formatDate(date, SHORT_DATE_FORMAT) === formatDate(moment(), SHORT_DATE_FORMAT);

export const replaceToDash = string => string.replace(/[_ \\/]+/g, '-').replace(/-+/g, '-');

export const replaceLocale = (url, lang) => url.replace(`/${lang}`, '');

export const toTitleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(s => `${s[0].toUpperCase()}${s.slice(1)}`)
    .join(' ');

export const renderNodeList = (nodes, delimiter = <span>, </span>) =>
  !!nodes.length && nodes.reduce((acc, node, key) => [acc, cloneElement(delimiter, { key }), node]);
