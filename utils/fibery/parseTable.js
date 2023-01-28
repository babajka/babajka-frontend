import createConstants from 'lib/utils/createConstants';

export const TYPES = createConstants(
  'UNKNOWN',
  'TABLE',
  'TABLE_RIGHT',
  'NOTE',
  'POEM',
  'SPLIT',
  'TIMELINE',
  'CAROUSEL'
);

export const traverseTable = (content = [], returnUnknown = false) =>
  content.reduce((acc, { type, ...params }) => {
    // eslint-disable-next-line no-use-before-define
    const convert = PARSERS[type];
    if (!convert) {
      if (returnUnknown) {
        return acc.concat({ type, ...params });
      }
      return acc;
    }
    return acc.concat(convert(params, returnUnknown));
  }, []);

const defaultParse = ({ content }, returnUnknown) => traverseTable(content, returnUnknown);

const PARSERS = {
  table_row: defaultParse,
  table_cell: defaultParse,
  paragraph: defaultParse,
  text: ({ text }) => text,
};

export const getTableMeta = content => {
  if (!Array.isArray(content)) {
    return [TYPES.UNKNOWN];
  }
  const [first, ...rest] = content;
  const [type] = traverseTable([first]);
  if (!TYPES[type]) {
    return [TYPES.TABLE, content];
  }
  return [type, rest];
};

export const traverseTableRowByRow = (table = [], returnUnknown = false) => {
  return table.reduce((acc, { type, content }) => {
    if (type !== 'table_row') {
      return acc;
    }
    const t = content.map(({ type: cellType, content: cellContent }) => {
      if (cellType !== 'table_cell') {
        return '';
      }
      return traverseTable(cellContent, returnUnknown);
    });
    return [...acc, t];
  }, []);
};
