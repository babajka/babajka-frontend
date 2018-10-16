import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import identity from 'lodash/identity';
import noop from 'lodash/noop';

const FormWrapper = ({ action, mapValues, dispatch, callback, ...props }) => (
  <Formik
    onSubmit={(values, actions) => {
      const submitAction = action(mapValues(values));
      submitAction.meta.formikActions = actions;
      dispatch(submitAction).then(callback);
    }}
    {...props}
  />
);

FormWrapper.propTypes = {
  action: PropTypes.func.isRequired,
  mapValues: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  callback: PropTypes.func,
};

FormWrapper.defaultProps = {
  mapValues: identity,
  callback: noop,
};

export default connect()(FormWrapper);
