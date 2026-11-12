// i18n code and types shared by server and client. Must not import data/i18n.json at runtime:
// this module ends up in client bundles (lib/i18n/client.tsx), and the dictionary must not
// (lib/i18n/dict.ts is `server-only`). Types come from a type-only import.
type Dict = typeof import('@/data/i18n.json');
type Scope = keyof Dict;

type KeysOf<S extends Scope> = `${S}.${keyof Dict[S] & string}`;

/** `'<scope>.<key>'`, e.g. `'footer.rss'`. Only keys present in data/i18n.json type-check. */
export type DictKey = { [S in Scope]: KeysOf<S> }[Scope];

/**
 * Scopes whose translations client islands get (via `I18nProvider`). Server Components can use
 * every key; a client island can only use these, so the rest of the dictionary stays on the server.
 * Add a scope here when a client island needs it.
 */
export const CLIENT_SCOPES = ['common', 'errors', 'footer', 'sidebar'] as const;

export type ClientScope = (typeof CLIENT_SCOPES)[number];

/** Keys available in client islands (`useT()`, `<ClientText>`). */
export type ClientKey = { [S in ClientScope]: KeysOf<S> }[ClientScope];

/** Translations for one locale, as passed to client islands. */
export type ClientMessages = Record<ClientKey, string>;

/** Separator for multi-part translations, e.g. a text with a link in the middle. */
export const SEPARATOR = '||';

/** Legacy `<Text render>` gets the parts of a `||`-separated translation as arguments. */
export const splitParts = (text: string) => text.split(SEPARATOR);
