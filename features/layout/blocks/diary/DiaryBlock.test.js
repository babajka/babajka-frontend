import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import LocaleContext from 'components/common/LocaleContext';
import { DiaryProvider } from 'features/diary/store';
import DiaryBlock from 'features/layout/blocks/diary/DiaryBlock';

vi.mock('routes', () => ({
  ROUTES_NAMES: { diary: 'diary' },
  Link: ({ children }) => children,
}));

const DATA = {
  slug: 'test-diary',
  date: new Date(1990, 2, 15).getTime(),
  day: 15,
  month: 3,
};

const renderBlock = lang =>
  render(
    <LocaleContext.Provider value={lang}>
      <DiaryProvider value={{ data: DATA }}>
        <DiaryBlock />
      </DiaryProvider>
    </LocaleContext.Provider>
  );

describe('features/layout/blocks/diary/DiaryBlock', () => {
  it('formats the date in the current locale from LocaleContext', () => {
    renderBlock('ru');
    expect(screen.getByText('15 марта')).toBeInTheDocument();
  });

  it('uses english month names for en', () => {
    renderBlock('en');
    expect(screen.getByText('15 March')).toBeInTheDocument();
  });

  it('uses belarusian month names for be', () => {
    renderBlock('be');
    expect(screen.getByText('15 сакавіка')).toBeInTheDocument();
  });
});
