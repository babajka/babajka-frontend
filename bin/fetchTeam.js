#!/usr/bin/env node

const { writeFileSync } = require('fs');
const keyBy = require('lodash/keyBy');
const set = require('lodash/set');

const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1oWExrh42zTrYPWWNRgdxRQayB7_5HHar3zZxOUY6G5E');
doc.useApiKey(process.env.BABAJKA_GOOGLE_API_KEY);

// Locale is ignored unless in a list below.
const locales = ['be', 'en', 'ru'];
const scopesLocalized = ['name', 'role'];
const scopesUnlocalized = ['image'];

const run = async () => {
  await doc.loadInfo();

  const { team: sheet } = keyBy(doc.sheetsByIndex, 'title');

  const team = [];

  await sheet
    .getRows()
    .then(rows => {
      rows.forEach(row => {
        const data = {};
        scopesUnlocalized.forEach(scope => {
          set(data, [scope], row[scope]);
        });
        locales.forEach(locale => {
          scopesLocalized.forEach(scope => {
            set(data, [scope, locale], row[`${locale}.${scope}`]);
          });
        });
        team.push(data);
      });
    })
    .then(() => {
      writeFileSync('data/team.json', JSON.stringify(team));
    });
};

if (require.main === module) {
  run();
}
