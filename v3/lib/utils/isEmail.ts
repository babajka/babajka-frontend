// Ported from the legacy `lib` submodule (`lib/utils/isEmail.js`).
const EMAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

const isEmail = (email: string | null | undefined) => !!email?.match(EMAIL_REGEX);

export default isEmail;
