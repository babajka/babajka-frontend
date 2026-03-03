import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatLocalizedDate,
  getYear,
  DATE_FORMAT,
  MINSK_TZ_OFFSET,
} from 'utils/formatters/date';

describe('utils/formatters/date', () => {
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
      const result = formatDate(new Date('2024-01-15'));
      expect(result).toBe('15 January 2024');
    });

    it('should format date with custom format', () => {
      const result = formatDate(new Date('2024-01-15'), 'yyyy-MM-dd');
      expect(result).toBe('2024-01-15');
    });
  });

  describe('formatLocalizedDate', () => {
    it('should format date in Belarusian by default', () => {
      const result = formatLocalizedDate(new Date('2024-01-15'), 'be');
      expect(result).toBe('15 студзеня 2024');
    });

    it('should format date in Russian', () => {
      const result = formatLocalizedDate(new Date('2024-01-15'), 'ru');
      expect(result).toBe('15 января 2024');
    });

    it('should format date in English', () => {
      const result = formatLocalizedDate(new Date('2024-01-15'), 'en');
      expect(result).toBe('15 January 2024');
    });

    it('should use custom format', () => {
      const result = formatLocalizedDate(new Date('2024-01-15'), 'en', 'yyyy');
      expect(result).toBe('2024');
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
