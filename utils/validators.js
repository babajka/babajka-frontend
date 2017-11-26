import text from 'constants/dictionary';

const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

export const isEmail = (email, message = text.badEmail) =>
  email.match(emailRegexp) ? null : message;

export const isEqual = (value1, value2, message) => (value1 === value2 ? null : message);

export const required = (field, message = text.required) => (field ? null : message);

export const checkLength = (value, length, message) => (value.length < length ? message : null);
