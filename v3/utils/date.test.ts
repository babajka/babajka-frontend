import { describe, expect, it } from 'vitest';

import {
  DATE_FORMAT,
  formatDate,
  formatLocalizedDate,
  getYear,
  MINSK_TZ_OFFSET,
} from '@/utils/date';

// Ported from legacy `utils/formatters/date.test.js`.
// `new Date('2024-01-15')` is UTC midnight; vitest.config.mts pins TZ=UTC so the day doesn't shift.
describe('utils/date', () => {
  describe('getYear', () => {
    it('should extract year from date string', () => {
      expect(getYear('2024-01-15')).toBe(2024);
    });

    it('should extract year from Date object', () => {
      expect(getYear(new Date('2023-06-20'))).toBe(2023);
    });

    it('should handle invalid date', () => {
      expect(getYear('invalid')).toBe(NaN);
    });
  });

  describe('formatDate', () => {
    it('should format date with default format', () => {
      expect(formatDate(new Date('2024-01-15'))).toBe('15 January 2024');
    });

    it('should format date with custom format', () => {
      expect(formatDate(new Date('2024-01-15'), 'yyyy-MM-dd')).toBe('2024-01-15');
    });
  });

  describe('formatLocalizedDate', () => {
    it('should format date in Belarusian by default', () => {
      expect(formatLocalizedDate(new Date('2024-01-15'))).toBe('15 студзеня 2024');
      expect(formatLocalizedDate(new Date('2024-01-15'), 'be')).toBe('15 студзеня 2024');
    });

    it('should format date in Russian', () => {
      expect(formatLocalizedDate(new Date('2024-01-15'), 'ru')).toBe('15 января 2024');
    });

    it('should format date in English', () => {
      expect(formatLocalizedDate(new Date('2024-01-15'), 'en')).toBe('15 January 2024');
    });

    it('should use custom format', () => {
      expect(formatLocalizedDate(new Date('2024-01-15'), 'en', 'yyyy')).toBe('2024');
    });
  });

  describe('constants', () => {
    it('should have MINSK_TZ_OFFSET defined', () => {
      expect(MINSK_TZ_OFFSET).toBe(3);
    });

    it('should have DATE_FORMAT defined', () => {
      expect(DATE_FORMAT).toBe('d MMMM yyyy');
    });
  });
});
