import React from 'react';
import { Field } from 'formik';

import Text from 'components/common/Text';
import Input from 'components/common/ui/Input';

const InputField = ({ name, showError, ...props }) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const error = showError || (touched[name] && errors[name]);
      return <Input {...field} {...props} error={error && <Text id={error} />} />;
    }}
  />
);

export default InputField;
