/**
 * Fetches the UI dictionary from the Google Sheet and writes data/i18n.json.
 * Ported from legacy bin/fetchDict.js, without dependencies: Sheets REST API + native fetch.
 *
 *   npm run fetch-dict    # needs BABAJKA_GOOGLE_API_KEY in the env or in v3/.env
 *
 * Runs natively on Node 26 (type stripping), so only erasable TS syntax here.
 * data/i18n.json is committed: builds (incl. Docker on Майстэрня) and typed keys don't need the key.
 */
import { writeFileSync } from 'node:fs';

const SPREADSHEET_ID = '1b3Or9-t_pDZq6GOL4MRUbFhoXuteVxCrRHTM17DLALg';
const OUTPUT = new URL('../data/i18n.json', import.meta.url);

// Same lists as legacy. A locale or tab not listed here is ignored.
const LOCALES = ['be', 'en', 'ru'] as const;
const SCOPES = [
  'about',
  'article',
  'banners',
  'collection',
  'common',
  'diary',
  'errors',
  'footer',
  'header',
  'sidebar',
  'topic',
] as const;

type Locale = (typeof LOCALES)[number];
type Dict = Record<string, Record<string, Partial<Record<Locale, string>>>>;

const fetchScope = async (scope: string, apiKey: string) => {
  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(scope)}`
  );
  url.searchParams.set('key', apiKey);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`[fetch-dict] ${scope}: ${response.status} ${await response.text()}`);
  }
  const { values = [] } = (await response.json()) as { values?: string[][] };
  const [header = [], ...rows] = values;
  const column = (name: string) => header.indexOf(name);

  const entries: Dict[string] = {};
  for (const row of rows) {
    const key = row[column('key')];
    if (!key) continue;
    const entry: Partial<Record<Locale, string>> = {};
    for (const locale of LOCALES) {
      const value = row[column(locale)];
      if (value) entry[locale] = value;
    }
    entries[key] = entry;
  }
  return entries;
};

const sortKeys = <T,>(object: Record<string, T>) =>
  Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b)));

const main = async () => {
  const apiKey = process.env.BABAJKA_GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('[fetch-dict] BABAJKA_GOOGLE_API_KEY is not set (env or v3/.env)');
    process.exit(1);
  }

  const scopes = await Promise.all(SCOPES.map(scope => fetchScope(scope, apiKey)));
  const dict: Dict = Object.fromEntries(SCOPES.map((scope, i) => [scope, sortKeys(scopes[i])]));

  // Sorted and pretty-printed, so dictionary updates are readable in diffs.
  writeFileSync(OUTPUT, `${JSON.stringify(dict, null, 2)}\n`);
  const count = Object.values(dict).reduce((sum, entries) => sum + Object.keys(entries).length, 0);
  console.warn(`[fetch-dict] wrote ${count} keys in ${SCOPES.length} scopes to data/i18n.json`);
};

await main();
