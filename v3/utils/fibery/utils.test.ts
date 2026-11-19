import { describe, expect, it } from 'vitest';

import { parseImage, parseQuote } from './utils';

describe('parseQuote', () => {
  it('splits the quote and its author', () => {
    expect(parseQuote('Text{Author}')).toEqual({ quote: 'Text', author: 'Author' });
    expect(parseQuote('Text')).toEqual({ quote: 'Text', author: undefined });
  });

  it('survives an empty quote', () => {
    expect(parseQuote('').quote).toBe('');
  });
});

describe('parseImage', () => {
  it('reads the alignment from the hash', () => {
    expect(parseImage('/a.png#align=right')).toEqual({ url: '/a.png', isRight: true });
    expect(parseImage('/a.png#align=:alignment/block-right').isRight).toBe(true);
    expect(parseImage('/a.png')).toEqual({ url: '/a.png', isRight: false });
  });
});
