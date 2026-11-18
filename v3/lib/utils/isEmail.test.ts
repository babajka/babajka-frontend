// Ported from the legacy `lib` submodule (`lib/utils/isEmail.test.js`).
import { describe, expect, it } from 'vitest';
import isEmail from '@/lib/utils/isEmail';

describe('lib/utils/isEmail', () => {
  it('should return true for valid email', () => {
    expect(isEmail('test@example.com')).toBe(true);
  });

  it('should return true for email with subdomain', () => {
    expect(isEmail('test@sub.domain.com')).toBe(true);
  });

  it('should return true for email with plus sign', () => {
    expect(isEmail('test+tag@example.com')).toBe(true);
  });

  it('should return true for email with dot in local part', () => {
    expect(isEmail('first.last@example.com')).toBe(true);
  });

  it('should return false for email without @', () => {
    expect(isEmail('testexample.com')).toBe(false);
  });

  it('should return false for email without domain', () => {
    expect(isEmail('test@')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isEmail('')).toBe(false);
  });

  it('should return false for null', () => {
    expect(isEmail(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isEmail(undefined)).toBe(false);
  });

  it('should return false for random string', () => {
    expect(isEmail('not an email')).toBe(false);
  });
});
