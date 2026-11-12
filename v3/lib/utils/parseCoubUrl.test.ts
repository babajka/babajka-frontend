// Ported from the legacy `lib` submodule (`lib/utils/parseCoubUrl.test.js`).
import { describe, expect, it } from 'vitest';
import parseCoubUrl from '@/lib/utils/parseCoubUrl';

describe('lib/utils/parseCoubUrl', () => {
  it('should extract coub ID from standard coub URL', () => {
    expect(parseCoubUrl('https://coub.com/view/abc123def456')).toBe('abc123def456');
  });

  it('should extract coub ID from www coub URL', () => {
    expect(parseCoubUrl('https://www.coub.com/view/abc123def456')).toBe('abc123def456');
  });

  it('should return null for URL without protocol', () => {
    expect(parseCoubUrl('coub.com/view/abc123def456')).toBe(null);
  });

  it('should return null for invalid URL', () => {
    expect(parseCoubUrl('not-a-coub-url')).toBe(null);
  });

  it('should return null for empty string', () => {
    expect(parseCoubUrl('')).toBe(null);
  });

  it('should return null for non-coub URL', () => {
    expect(parseCoubUrl('https://youtube.com/watch?v=abc')).toBe(null);
  });

  it('should handle URL with additional path', () => {
    expect(parseCoubUrl('https://coub.com/view/abc123def456/embed')).toBe('abc123def456');
  });
});
