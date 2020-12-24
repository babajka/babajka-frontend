const convertContent = (content, { useBreak = false } = {}, init = '') => {
  if (!Array.isArray(content)) {
    return init;
  }
  return content.reduce((acc, { type, ...params }) => {
    // eslint-disable-next-line no-use-before-define
    const convert = CONVERTERS[type];
    if (!convert) {
      return acc;
    }
    return `${acc}${convert(params, { useBreak })}`;
  }, init);
};

const CONVERTERS = {
  paragraph: ({ content }, { useBreak }) =>
    `${convertContent(content, { useBreak })}${useBreak ? '\n' : ''}`,
  text: ({ text }) => text,
};

export default convertContent;
