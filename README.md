# babajka-frontend

[![Build Status](https://travis-ci.org/babajka/babajka-frontend.svg?branch=master)](https://travis-ci.org/babajka/babajka-frontend)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a3dbbfeb35e84d4dbbb394be08ec196a)](https://www.codacy.com/app/babajka/babajka-frontend?utm_source=github.com&utm_medium=referral&utm_content=babajka/babajka-frontend&utm_campaign=Badge_Grade)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/wir-by/frontend)

Next.js &amp; React app

## scripts

- `npm start` to run dev server with hot-reloading (`npm run dev`)
- `npm run start:prod` to build and run a production version
- `npm run build` to build a production version (`WIR_ENV=staging` must be set for [`dev.wir.by`](http://dev.wir.by))
- `npm run local-backend` to run dev server that uses `http://localhost:8080` as backend
- `npm run deploy-from-local` to deploy code on [`dev.wir.by`](http://dev.wir.by)
- `npm run lint` to check code style with [`eslint`](http://eslint.org/),
  [`airbnb`](https://github.com/airbnb/javascript/tree/master/react) react style guide and
  [`prettier`](https://prettier.io)
- `npm run lint` to just fix style with `prettier` and check on `eslint` errors
- `npm run update-dict` to fetch translations from [GoogleDrive](https://docs.google.com/spreadsheets/d/e/2PACX-1vTAexRyfGOsnzvZKvVpPkr8M-l3Ph2vAvBqVu7W_vrPOQ3iUIGg4ZVcOLCeFj-Qg6BowPluH9QO3vXM/pubhtml#) and store it in `data/i18n.json` (gitignored)
- `npm run storybook` to run storybook on [`localhost:9001`](http://localhost:9001/)
  - `npm run storybook:build` to build static version of storybook
  - `npm run storybook:deploy` to deploy storybook on
    [`gh-pages`](https://babajka.github.io/babajka-frontend)
- `npm run reset-cache` to delete `.next` builded & cached files
- `npm run analyze` to check bundle sizes with [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) (create reports in `reports/`)
  - `npm run analyze:server`
  - `npm run analyze:client`
- `npm run size` to check client-side bundle sizes with [`bundlesize`](https://github.com/siddharthkp/bundlesize)

## configuration

- `npm run dev -- http://localhost:8080` sets url to the local backend instance. (defaults to `https://api.wir.by`)

## rules

- we use [`ducks convention`](https://github.com/erikras/ducks-modular-redux) for redux modules
- we have autoversioning set up, in order to trigger new release one should follow the conventions:

  - `fix(<scope>): <subject>` - increases **patch** version: 1.0.0 -> 1.0.1
  - `style(<scope>): <subject>` - increases **patch** version: 1.0.0 -> 1.0.1
  - `feat(<scope>): <subject>` - increases **minor** version: 1.0.0 -> 1.1.0
  - `major(<scope>): <subject>` - increases **major** version: 1.0.0 -> 2.0.0

- all commit messages checked with [commitlint](https://github.com/marionebl/commitlint), feel free to add new `scope`'s and `type`'s to [`.commitlintrc.js`](https://github.com/babajka/babajka-frontend/blob/master/.commitlintrc.js)
