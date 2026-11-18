import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Home from '@/app/[lang]/page';

// The articles list is covered in components/LatestArticles.test.tsx.
vi.mock('@/components/LatestArticles', () => ({ default: () => null }));
vi.mock('@/lib/i18n/server', () => ({
  getLang: () => Promise.resolve('be'),
  Text: ({ id }: { id: string }) => id,
}));

describe('app/page', () => {
  it('should render the v3 heading', async () => {
    render(await Home());
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wir.by v3');
  });
});
