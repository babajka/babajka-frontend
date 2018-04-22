#!/usr/bin/env node
const { writeFileSync } = require('fs');
const keyBy = require('lodash/keyBy');
const set = require('lodash/set');

const GoogleSpreadsheet = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1oWExrh42zTrYPWWNRgdxRQayB7_5HHar3zZxOUY6G5E');

// Please keep arrays below in an alphabetical order.
// Locale is ignored unless in a list below.
const locales = ['be', 'en', 'ru'];

const parseSheet = (sheet, scopesLocalized = [], scopesUnlocalized = []) =>
  new Promise(resolve => {
    const team = [];
    sheet.getRows({}, (error, rows) => {
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
      resolve(team);
    });
  });

doc.getInfo((err, info) => {
  const { team, vacancies } = keyBy(info.worksheets, 'title');
  parseSheet(team, ['name', 'role'], ['image']).then(data =>
    writeFileSync('data/team.json', JSON.stringify(data))
  );
  parseSheet(vacancies, ['title', 'description']).then(data =>
    writeFileSync('data/vacancies.json', JSON.stringify(data))
  );
});
