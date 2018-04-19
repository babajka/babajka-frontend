#!/usr/bin/env node
const { writeFileSync } = require('fs');
const keyBy = require('lodash/keyBy');
const set = require('lodash/set');

const GoogleSpreadsheet = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1oWExrh42zTrYPWWNRgdxRQayB7_5HHar3zZxOUY6G5E');

// Please keep arrays below in an alphabetical order.
// Locale is ignored unless in a list below.
const locales = ['be', 'en', 'ru'];
// Team member attribute is ignored unless in a list below.
const scopesUnlocalized = ['image'];
const scopesLocalized = ['name', 'role'];

const team = [];

doc.getInfo((err, info) => {
  const teamSheet = keyBy(info.worksheets, 'title').team;

  new Promise(resolve => {
    teamSheet.getRows({}, (error, rows) => {
      rows.forEach(row => {
        const teamMember = {};
        scopesUnlocalized.forEach(scope => {
          set(teamMember, [scope], row[scope]);
        });
        locales.forEach(locale => {
          scopesLocalized.forEach(scope => {
            set(teamMember, [scope, locale], row[`${locale}.${scope}`]);
          });
        });
        team.push(teamMember);
      });
      resolve();
    });
  }).then(() => {
    writeFileSync('constants/team.json', JSON.stringify(team));
  });
});
