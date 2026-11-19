import { describe, expect, it } from 'vitest';

import { getTableMeta, traverseTable, traverseTableRowByRow } from './parseTable';
import type { FiberyNode } from './toString';

const cell = (...content: FiberyNode[]): FiberyNode => ({
  type: 'table_cell',
  content: [{ type: 'paragraph', content }],
});
const text = (value: string): FiberyNode => ({ type: 'text', text: value });
const row = (...content: FiberyNode[]): FiberyNode => ({ type: 'table_row', content });
const image: FiberyNode = { type: 'image', attrs: { src: '/a.png' } };

describe('traverseTable', () => {
  it('keeps unknown nodes only on request', () => {
    const table = [row(cell(text('a'), image))];
    expect(traverseTable(table)).toEqual(['a']);
    expect(traverseTable(table, true)).toEqual(['a', image]);
  });
});

describe('getTableMeta', () => {
  it('takes the type from the first row and drops that row', () => {
    const body = row(cell(text('line')));
    expect(getTableMeta([row(cell(text('POEM'))), body])).toEqual(['POEM', [body]]);
  });

  it('treats other tables as plain ones', () => {
    const table = [row(cell(text('Name')))];
    expect(getTableMeta(table)).toEqual(['TABLE', table]);
    expect(getTableMeta(undefined)).toEqual(['UNKNOWN', []]);
  });
});

describe('traverseTableRowByRow', () => {
  it('returns the content of each cell', () => {
    expect(traverseTableRowByRow([row(cell(text('a')), cell(text('b')))])).toEqual([
      [['a'], ['b']],
    ]);
  });
});
