import { describe, expect, it } from 'vitest';

import { colorLooksBlack, colorLooksWhite } from './color';

describe('colorLooksBlack', () => {
  it('accepts colors darker than #222222', () => {
    expect(colorLooksBlack('#212121')).toBe(true);
    expect(colorLooksBlack('#222222')).toBe(false);
  });
});

describe('colorLooksWhite', () => {
  it('accepts colors lighter than #dddddd', () => {
    expect(colorLooksWhite('#DEDEDE')).toBe(true);
    expect(colorLooksWhite('#dddddd')).toBe(false);
  });

  it('ignores colors in other formats', () => {
    expect(colorLooksWhite('white')).toBe(false);
    expect(colorLooksBlack('#000')).toBe(false);
  });
});
