import './forms.scss';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import identity from 'lodash/identity';
import noop from 'lodash/noop';

const FormWrapper = ({
  action,
  mapValues,
  dispatch,
  onSuccess,
  validate,
  validators,
  children,
  ...props
}) => (
  <Formik
    onSubmit={(values, actions) => {
      const submitAction = action(mapValues(values));
      if (!submitAction.meta) {
        submitAction.meta = {};
      }
      submitAction.meta.formikActions = actions;
      dispatch(submitAction).then(onSuccess);
    }}
    validate={values =>
      Object.entries(validators).reduce((acc, [name, validator]) => {
        const error = validator(values[name]);
        if (error) {
          acc[name] = error;
        }
        return acc;
      }, validate(values))
    }
    {...props}
  >
    {form => (
      <>
        {children(form)}
        <p className="form-error">{form.errors.global}</p>
      </>
    )}
  </Formik>
);

FormWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  // redux action creator
  action: PropTypes.func.isRequired,
  // optional form to payload mapper
  mapValues: PropTypes.func,
  // action success callback
  onSuccess: PropTypes.func,
  // original Formix `validate` prop
  validate: PropTypes.func,
  // prioritized <field: validator function> object
  validators: PropTypes.objectOf(PropTypes.func),
  // from connect
  dispatch: PropTypes.func.isRequired,
};

FormWrapper.defaultProps = {
  mapValues: identity,
  onSuccess: noop,
  validators: {},
  validate: () => ({}),
};

export default connect()(FormWrapper);
