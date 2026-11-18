import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Home from '@/app/page';

// The articles list is covered in components/LatestArticles.test.tsx.
vi.mock('@/components/LatestArticles', () => ({ default: () => null }));

describe('app/page', () => {
  it('should render the v3 heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wir.by v3');
  });
});
