import { isLoading } from 'utils/redux';

export default () => next => action => {
  const { meta, error, payload } = action;

  if (!meta || !meta.formikActions) {
    next(action);
    return;
  }

  const { setErrors, setSubmitting } = meta.formikActions;

  if (error) {
    setErrors(payload);
  }

  if (!isLoading(action)) {
    setSubmitting(false);
  }

  next(action);
};
