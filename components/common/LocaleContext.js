import React from 'react';

// import { DEFAULT_LOCALE } from 'constants';

// FIXME: storybook "export 'DEFAULT_LOCALE' was not found in '../constants'"
export const DEFAULT_LOCALE = 'be';
// FIXME: storybook "export 'VALID_LOCALES' was not found in '../constants'"
export const VALID_LOCALES = ['be', 'ru', 'en'];

export default React.createContext(DEFAULT_LOCALE);
