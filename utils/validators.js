import moment from 'moment';
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
export const isEmail = (email, massageId = 'auth.badEmail') =>
  email.match(emailRegexp) ? null : massageId;

export const isEqual = (value1, value2, massageId) => (value1 === value2 ? null : massageId);

export const required = (field, massageId = 'forms.required') => (field ? null : massageId);

export const checkLength = (value, length, massageId) => (value.length < length ? massageId : null);

export const isSameDay = date => {
  const now = moment();
  const day = moment(date);
  return day.date() === now.date() && day.month() === now.month();
};

export const validDate = date => !moment(date).isValid() && 'forms.invalidDate';

const slugRegexp = /^[a-zA-Z0-9_-]+$/;
export const isSlug = (slug, messageId = 'article.slug-req') =>
  slug.match(slugRegexp) ? null : messageId;

const urlRegexp = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
export const isUrl = (url, messageId = 'article.valide-url') =>
  url === '' || url.match(urlRegexp) ? null : messageId;

export const secureUrl = (url, messageId = 'article.https-url') =>
  isUrl(url) || (url === '' || url.startsWith('https://') ? null : messageId);
