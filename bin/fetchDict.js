#!/usr/bin/env node
const { writeFileSync } = require('fs');
const keyBy = require('lodash/keyBy');
const pick = require('lodash/pick');
const set = require('lodash/set');

const GoogleSpreadsheet = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1b3Or9-t_pDZq6GOL4MRUbFhoXuteVxCrRHTM17DLALg');

// Please keep arrays below in an alphabetical order.
// Locale is ignored unless in a list below.
const locales = ['be', 'en', 'ru'];
// Spreadsheet Tab is ignored unless in a list below.
const scopes = ['auth', 'footer', 'forms', 'header', 'home', 'article', 'common'];

const dict = {};

doc.getInfo((err, info) => {
  const sheets = pick(keyBy(info.worksheets, 'title'), scopes);

  Promise.all(
    Object.values(sheets).map(
      sheet =>
        new Promise(resolve => {
          const scope = sheet.title;
          sheet.getRows({}, (error, rows) => {
            rows.forEach(row => {
              const { key } = row;
              locales.forEach(locale => {
                set(dict, [scope, key, locale], row[locale]);
              });
            });
            resolve();
          });
        })
    )
  ).then(() => {
    writeFileSync('constants/i18n.json', JSON.stringify(dict));
  });
});
