const convertContent = (content, init = '') => {
  if (!Array.isArray(content)) {
    return init;
  }
  return content.reduce((acc, { type, ...params }) => {
    // eslint-disable-next-line no-use-before-define
    const convert = CONVERTERS[type];
    if (!convert) {
      return acc;
    }
    return `${acc}${convert(params)}`;
  }, init);
};

const CONVERTERS = {
  paragraph: ({ content }) => `${convertContent(content)} `,
  text: ({ text }) => text,
};

export default convertContent;
