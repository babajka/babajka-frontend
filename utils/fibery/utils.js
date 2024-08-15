// https://regex101.com/r/nfWRsT/1
const QUOTE_REGEX = /([^{}]+)(?:{(.+)})?/;

export const parseQuote = s => {
  const [_, quote, author] = QUOTE_REGEX.exec(s);
  return { quote, author };
};

export const parseImage = src => {
  const [url, rawParams] = src.split('#');
  const params = new URLSearchParams(rawParams);
  const alignParam = params.get('align');
  const isRight = alignParam === 'right' || alignParam === ':alignment/block-right';
  return { url, isRight };
};
