import { isLoading } from 'utils/redux';

const formMiddleware = () => next => action => {
  const { meta, error, payload } = action;

  if (!meta || !meta.formikActions) {
    next(action);
    return;
  }

  const { setErrors, setSubmitting } = meta.formikActions;

  if (error) {
    const errors = typeof payload === 'string' ? { global: payload } : payload;
    setErrors(errors);
  }

  if (!isLoading(action)) {
    setSubmitting(false);
  }

  next(action);
};

export default formMiddleware;
