import createConstants from 'lib/utils/createConstants';

export const TYPES = createConstants('UNKNOWN', 'TABLE', 'TABLE_RIGHT', 'NOTE');

const traverse = (content = []) =>
  content.reduce((acc, { type, ...params }) => {
    // eslint-disable-next-line no-use-before-define
    const convert = PARSERS[type];
    if (!convert) {
      return acc;
    }
    return acc.concat(convert(params));
  }, []);

const defaultParse = ({ content }) => traverse(content);

const PARSERS = {
  paragraph: defaultParse,
  table_row: defaultParse,
  table_cell: defaultParse,
  text: ({ text }) => text,
};

const getMeta = content => {
  if (!Array.isArray(content)) {
    return [TYPES.UNKNOWN];
  }
  const [first, ...rest] = content;
  const [type] = traverse([first]);
  if (!TYPES[type]) {
    return [TYPES.TABLE, content];
  }
  return [type, rest];
};

export default getMeta;
