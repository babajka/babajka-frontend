import { describe, expect, it } from 'vitest';

import type { DiaryEntry } from '@/lib/types';

import {
  getDiary,
  getDiaryShareText,
  getMinskDay,
  isNextDiaryAvailable,
  isTodayDiary,
} from './diary';

const data: DiaryEntry = { slug: 'a', year: 1942, month: '11', day: '19' };

describe('getDiary', () => {
  it('builds the date from the day of the entry', () => {
    expect(new Date(getDiary(data, 'be').date).getFullYear()).toBe(1942);
    expect(getDiary(data, 'be').author).toEqual({});
  });
});

describe('getMinskDay', () => {
  it('switches the day at midnight in Minsk', () => {
    expect(getMinskDay(new Date('2026-11-18T20:59:00Z'))).toEqual({ month: 11, day: 18 });
    expect(getMinskDay(new Date('2026-11-18T21:00:00Z'))).toEqual({ month: 11, day: 19 });
  });
});

describe('isNextDiaryAvailable', () => {
  const now = new Date('2026-11-19T09:00:00Z');
  const next = { month: '11', day: '20', slug: 'b' };

  it('is false on today, in any year, and without the next entry', () => {
    expect(isTodayDiary(data, now)).toBe(true);
    expect(isNextDiaryAvailable(data, next, now)).toBe(false);
    expect(isNextDiaryAvailable({ month: '11', day: '18' }, undefined, now)).toBe(false);
  });

  it('is true on other days', () => {
    expect(isNextDiaryAvailable({ month: '11', day: '18' }, next, now)).toBe(true);
  });
});

describe('getDiaryShareText', () => {
  const options = {
    date: new Date(1942, 10, 19).getTime(),
    name: 'Name',
    lang: 'be',
    wrote: 'wrote',
    content: 'text',
  } as const;

  it('names the year on today', () => {
    expect(getDiaryShareText({ ...options, isToday: true }).basicText).toBe(
      'Сёння, у 1942 годзе, Name wrote...'
    );
  });

  it('names the date on other days', () => {
    expect(getDiaryShareText({ ...options, isToday: false }).extendedText).toBe(
      '19 лістапада 1942 Name wrote:\n«text...»\n'
    );
  });
});
