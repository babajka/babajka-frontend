import { describe, expect, it } from 'vitest';

import { fiberyToString } from './toString';

const content = [
  { type: 'paragraph', content: [{ type: 'text', text: 'a' }] },
  { type: 'image' },
  { type: 'paragraph', content: [{ type: 'text', text: 'b' }] },
];

describe('fiberyToString', () => {
  it('joins the text of paragraphs and skips other nodes', () => {
    expect(fiberyToString(content)).toBe('ab');
  });

  it('adds line breaks on request', () => {
    expect(fiberyToString(content, { useBreak: true })).toBe('a\nb\n');
  });

  it('returns an empty string for missing content', () => {
    expect(fiberyToString(undefined)).toBe('');
  });
});
