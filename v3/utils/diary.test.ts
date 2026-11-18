import { describe, expect, it } from 'vitest';

import type { DiaryEntry } from '@/lib/types';

import { getDiary } from './diary';

const data: DiaryEntry = { slug: 'a', year: 1942, month: '11', day: '19' };

describe('getDiary', () => {
  it('builds the date from the day of the entry', () => {
    expect(new Date(getDiary(data, 'be').date).getFullYear()).toBe(1942);
    expect(getDiary(data, 'be').author).toEqual({});
  });
});
