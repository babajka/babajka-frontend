// Ported from the legacy `lib` submodule (`lib/utils/createConstants.test.js`).
import { describe, expect, it } from 'vitest';
import createConstants from '@/lib/utils/createConstants';

describe('lib/utils/createConstants', () => {
  it('should create constants from single value', () => {
    const result = createConstants('TEST');
    expect(result).toEqual({ TEST: 'TEST' });
  });

  it('should create constants from multiple values', () => {
    const result = createConstants('A', 'B', 'C');
    expect(result).toEqual({ A: 'A', B: 'B', C: 'C' });
  });

  it('should handle empty arguments', () => {
    const result = createConstants();
    expect(result).toEqual({});
  });

  it('should handle mixed case constants', () => {
    const result = createConstants('FETCH_START', 'FETCH_SUCCESS', 'FETCH_ERROR');
    expect(result).toEqual({
      FETCH_START: 'FETCH_START',
      FETCH_SUCCESS: 'FETCH_SUCCESS',
      FETCH_ERROR: 'FETCH_ERROR',
    });
  });
});
