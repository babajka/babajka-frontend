#!/usr/bin/env node
const { writeFileSync } = require('fs');
const fetch = require('isomorphic-fetch');
const set = require('lodash/set');

const ID = `1b3Or9-t_pDZq6GOL4MRUbFhoXuteVxCrRHTM17DLALg`;
const URL = `https://spreadsheets.google.com/feeds/list/${ID}/od6/public/values?alt=json`;
const PREFIX = 'gsx$';
const VALUE = '$t';
const KEY = 'key';
const dict = {};

const getLocales = row =>
  Object.keys(row)
    .filter(key => key.startsWith(PREFIX) && !key.endsWith(KEY))
    .map(key => key.slice(-2));

const get = (row, key) => row[`${PREFIX}${key}`][VALUE];

fetch(URL)
  .then(res => res.json())
  .then(({ feed: { entry } }) => {
    entry.forEach(row => {
      const locales = getLocales(row);
      const key = get(row, KEY);
      locales.forEach(l => {
        set(dict, `${key}.${l}`, get(row, l));
      });
    });
  })
  .then(() => writeFileSync('constants/i18n.json', JSON.stringify(dict)));
