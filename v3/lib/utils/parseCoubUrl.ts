// Ported from the legacy `lib` submodule (`lib/utils/parseCoubUrl.js`).
const COUB_URL_REGEX = /(?:http|https)?:\/\/(?:www\.)?coub\.com\/view\/([a-zA-Z\d]+)/;

/** Returns the Coub video id, or `null` if `url` is not a Coub video URL. */
const parseCoubUrl = (url: string) => COUB_URL_REGEX.exec(url)?.[1] ?? null;

export default parseCoubUrl;
