// https://regex101.com/r/nfWRsT/1
const QUOTE_REGEX = /([^{}]+)(?:{(.+)})?/;

export const parseQuote = s => {
  const [_, quote, author] = QUOTE_REGEX.exec(s);
  return { quote, author };
};

// https://regex101.com/r/7eFFHP/2
const IMAGE_URL_REGEX = /(.+)#align=(.+)$/;

export const parseImage = src => {
  const urlWithAlign = src.includes('#align') ? src : `${src}#align=center`;
  const [_, url, align] = urlWithAlign.match(IMAGE_URL_REGEX);
  return { url, align };
};
