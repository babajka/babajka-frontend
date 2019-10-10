import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { defaultReducer } from 'utils/redux';
import { makeRequest } from 'utils/request';
import { getLocalizedArticle, getLocalesBySlug } from 'utils/getters';

const duck = 'publicArticle';

// constants
const FETCH_BY_SLUG = `${duck}/FETCH_BY_SLUG`;

// reducer
const initialState = {
  pending: false,
  current: null,
  localeBySlug: {},
};

export default createReducer(
  {
    [FETCH_BY_SLUG]: defaultReducer((state, { payload }) => ({
      ...state,
      pending: false,
      current: payload,
      localeBySlug: getLocalesBySlug(payload),
    })),
  },
  initialState
);

// selectors
const getState = state => state.publicArticle;
const isPending = state => getState(state).pending;

const getRawCurrent = state => getState(state).current;
const getLocaleBySlug = (state, slug) => getState(state).localeBySlug[slug];
const getCurrent = (state, slug) =>
  getLocalizedArticle(getRawCurrent(state), getLocaleBySlug(state, slug));
const getOtherLocales = (state, slug) => {
  const currentLocale = getLocaleBySlug(state, slug);
  const { locales } = getRawCurrent(state);
  return Object.values(locales).filter(({ locale }) => locale !== currentLocale);
};

export const publicArticleSelectors = {
  getCurrent,
  getOtherLocales,

  isPending,
};

// actions
export const publicArticleActions = {
  fetchBySlug: slug => ({
    type: FETCH_BY_SLUG,
    payload: makeRequest(api.publicArticle.getBySlug(slug)),
  }),
};
