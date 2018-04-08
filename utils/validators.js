export const hasErrors = errors => !!Object.values(errors).filter(Boolean).length;

const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
export const isEmail = (email, massageId = 'auth.badEmail') =>
  email.match(emailRegexp) ? null : massageId;

export const isEqual = (value1, value2, massageId) => (value1 === value2 ? null : massageId);

export const required = (field, massageId = 'forms.required') => (field ? null : massageId);

export const checkLength = (value, length, massageId) => (value.length < length ? massageId : null);

const slugRegexp = /^[a-zA-Z0-9_-]+$/;
export const isSlug = (slug, messageId = 'article.slug-req') =>
  slug.match(slugRegexp) ? null : messageId;
