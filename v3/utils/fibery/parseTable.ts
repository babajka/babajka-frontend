// Ported from legacy `utils/fibery/parseTable.js`. A table's first cell can name a special block.
import type { FiberyNode } from './toString';

export const TABLE_TYPES = [
  'UNKNOWN',
  'TABLE',
  'TABLE_RIGHT',
  'NOTE',
  'POEM',
  'SPLIT',
  'TIMELINE',
  'CAROUSEL',
  'FILLOUT_QUIZ',
] as const;

export type TableType = (typeof TABLE_TYPES)[number];

export type TableItem = string | FiberyNode;

const CONTAINERS = new Set(['table_row', 'table_cell', 'paragraph']);

/** Flattens a table to its texts. With `returnUnknown`, other nodes (images) are kept as they are. */
export const traverseTable = (content: FiberyNode[] = [], returnUnknown = false): TableItem[] =>
  content.flatMap(node => {
    if (node.type === 'text') {
      return node.text ?? '';
    }
    if (CONTAINERS.has(node.type)) {
      return traverseTable(node.content, returnUnknown);
    }
    return returnUnknown ? [node] : [];
  });

const isTableType = (value: unknown): value is TableType =>
  (TABLE_TYPES as readonly unknown[]).includes(value);

export const getTableMeta = (content?: FiberyNode[]): [TableType, FiberyNode[]] => {
  if (!Array.isArray(content)) {
    return ['UNKNOWN', []];
  }
  const [first, ...rest] = content;
  const [type] = traverseTable([first]);
  return isTableType(type) ? [type, rest] : ['TABLE', content];
};

export const traverseTableRowByRow = (table: FiberyNode[] = [], returnUnknown = false) =>
  table
    .filter(({ type }) => type === 'table_row')
    .map(({ content = [] }) =>
      content.map(cell =>
        cell.type === 'table_cell' ? traverseTable(cell.content, returnUnknown) : []
      )
    );
