import moment from 'moment';

export const hasErrors = errors => !!Object.values(errors).filter(Boolean).length;

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

const slugRegexp = /^[a-zA-Z0-9_-]+$/;
export const isSlug = (slug, messageId = 'article.slug-req') =>
  slug.match(slugRegexp) ? null : messageId;

const urlRegexp = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
export const isUrl = (url, messageId = 'article.valide-url') =>
  url.match(urlRegexp) ? null : messageId;
