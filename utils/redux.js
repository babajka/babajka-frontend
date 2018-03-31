import { LOADING, SUCCESS, ERROR } from 'constants/redux';

export const pendingReducer = state => ({
  ...state,
  pending: true,
});

const getErrors = payload => {
  if (typeof payload === 'object') {
    return { errors: payload };
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
