#!/usr/bin/env node

const { writeFileSync } = require('fs');
const keyBy = require('lodash/keyBy');
const pick = require('lodash/pick');
const set = require('lodash/set');

const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1b3Or9-t_pDZq6GOL4MRUbFhoXuteVxCrRHTM17DLALg');
doc.useApiKey(process.env.BABAJKA_GOOGLE_API_KEY);

// Please keep arrays below in an alphabetical order.
// Locale is ignored unless in a list below.
const locales = ['be', 'en', 'ru'];
// Spreadsheet Tab is ignored unless in a list below.
const scopes = [
  'about',
  // 'admin',
  'article',
  // 'auth',
  'banners',
  'collection',
  'common',
  'diary',
  'errors',
  'footer',
  // 'forms',
  'header',
  'sidebar',
  'topic',
];

const dict = {};

const run = async () => {
  await doc.loadInfo();

  const sheets = pick(keyBy(doc.sheetsByIndex, 'title'), scopes);

  await Promise.all(
    Object.values(sheets).map(sheet =>
      sheet.getRows().then(rows => {
        const scope = sheet.title;
        rows.forEach(row => {
          const { key } = row;
          locales.forEach(locale => {
            set(dict, [scope, key, locale], row[locale]);
          });
        });
      })
    )
  ).then(() => {
    writeFileSync('data/i18n.json', JSON.stringify(dict));
  });
};

if (require.main === module) {
  run();
}
