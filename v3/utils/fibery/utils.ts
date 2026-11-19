// Ported from legacy `utils/fibery/utils.js`.
const QUOTE_REGEX = /([^{}]+)(?:{(.+)})?/;

/** `Quote text{Author}` */
export const parseQuote = (value: string) => {
  const [, quote = '', author] = QUOTE_REGEX.exec(value) ?? [];
  return { quote, author };
};

/** `url#align=right` */
export const parseImage = (src: string) => {
  const [url, rawParams] = src.split('#');
  const align = new URLSearchParams(rawParams).get('align');
  return { url, isRight: align === 'right' || align === ':alignment/block-right' };
};
