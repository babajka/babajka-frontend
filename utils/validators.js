import isObject from 'lodash/isObject';

export const hasErrors = (errors, touched) =>
  errors &&
  !!Object.keys(errors).filter(key => {
    const err = errors[key];
    const touch = touched[key];
    if (isObject(touch)) {
      return hasErrors(err, touch);
    }
    return touch && err;
  }).length;

const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
export const isEmail = email => !!email?.match(emailRegexp);
export const validEmail = (email, massageId = 'forms.badEmail') =>
  isEmail(email) ? null : massageId;

export const notEqual = (value1, value2, massageId) => (value1 === value2 ? null : massageId);

export const required = (field, massageId = 'forms.required') => (field ? null : massageId);

export const checkLength = (value, length, massageId) => (value.length < length ? massageId : null);
