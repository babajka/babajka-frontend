# babajka-frontend

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a3dbbfeb35e84d4dbbb394be08ec196a)](https://www.codacy.com/app/babajka/babajka-frontend?utm_source=github.com&utm_medium=referral&utm_content=babajka/babajka-frontend&utm_campaign=Badge_Grade)
[![Dependency Status](https://www.versioneye.com/user/projects/595a95d16725bd003b4078a8/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/595a95d16725bd003b4078a8)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/wir-by/frontend)

Next.js &amp; React app

## scripts

* `npm start` to run dev server with hot-reloading (`npm run dev`)
* `npm run start:prod` to build and run a production version
* `npm run build` to build a production version
* `npm run lint` to check code style with [`eslint`](http://eslint.org/),
  [`airbnb`](https://github.com/airbnb/javascript/tree/master/react) react style guide and
  [`prettier`](https://prettier.io)
* `npm run lint` to just fix style with `prettier` and check on `eslint` errors
* `npm run prettify:watch` to watch & fix changed files style
* `npm run update-styles` to update styles from markup module
* `npm run update-dict` to fetch translations from [GoogleDrive](https://docs.google.com/spreadsheets/d/e/2PACX-1vTAexRyfGOsnzvZKvVpPkr8M-l3Ph2vAvBqVu7W_vrPOQ3iUIGg4ZVcOLCeFj-Qg6BowPluH9QO3vXM/pubhtml#) and store it in `data/i18n.json` (gitignored)
* `npm run storybook` to run storybook on [`localhost:9001`](http://localhost:9001/)
  * `npm run storybook:build` to build static version of storybook
  * `npm run storybook:deploy` to deploy storybook on
    [`gh-pages`](https://babajka.github.io/babajka-frontend)
* `npm run reset-cache` to delete `.next` builded & cached files
* `npm run analyze` to check bundle sizes with [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) (create reports in `reports/`)
  * `npm run analyze:server`
  * `npm run analyze:client`

## configuration

* `npm run dev -- http://localhost:8080` sets url to the local backend instance. (defaults to `http://api.wir.by`)

## rules

* we use [`ducks convention`](https://github.com/erikras/ducks-modular-redux) for redux modules
