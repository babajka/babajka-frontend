import { LOADING, SUCCESS, ERROR } from 'constants/redux';

export const pendingReducer = state => ({
  ...state,
  pending: true,
  error: false,
});

const getErrors = payload => {
  if (!__PROD__) {
    console.error('Error during api call: ', payload);
  }
  if (typeof payload === 'object') {
    return { error: true, errors: payload };
  }
  return { error: payload };
};

export const errorReducer = (state, { payload }) => ({
  ...state,
  ...getErrors(payload),
  pending: false,
});

export const defaultReducer = successReducer => ({
  [LOADING]: pendingReducer,
  [SUCCESS]: successReducer,
  [ERROR]: errorReducer,
});

export const isLoading = ({ type }) => type.endsWith(LOADING);

export const isSuccess = ({ type }) => type.endsWith(SUCCESS);
