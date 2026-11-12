import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import LatestArticles from '@/components/LatestArticles';
import { getLatestArticles, RequestError } from '@/lib/api';

vi.mock('next/server', () => ({ connection: () => Promise.resolve() }));
// plain <img> stand-in for next/image in jsdom
vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));
vi.mock('@/lib/api', async importOriginal => ({
  ...(await importOriginal<typeof import('@/lib/api')>()),
  getLatestArticles: vi.fn(),
}));

const ARTICLE = {
  _id: '1',
  publishAt: '2024-01-15T00:00:00.000Z',
  locales: { be: { slug: 'kupala', title: 'Купала', subtitle: 'Паэт' } },
  images: { horizontal: '/api/files/abc' },
};

// Async Server Components can't be rendered by React DOM directly, so await the element first.
const renderAsync = async (element: Promise<React.ReactElement>) => render(await element);

describe('components/LatestArticles', () => {
  afterEach(() => {
    vi.mocked(getLatestArticles).mockReset();
  });

  it('should render articles from the backend', async () => {
    vi.mocked(getLatestArticles).mockResolvedValue({ data: [ARTICLE], total: 42 });

    const { container } = await renderAsync(LatestArticles({}));

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Купала');
    expect(screen.getByText('Паэт')).toBeInTheDocument();
    expect(screen.getByText('15 студзеня 2024')).toBeInTheDocument();
    expect(screen.getByText(/42 articles on api\.wir\.by/)).toBeInTheDocument();
    // decorative cover (alt=""), so it has no `img` role
    expect(container.querySelector('img')).toHaveAttribute('src', '/api/files/abc');
  });

  it('should show an error instead of failing the page', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(getLatestArticles).mockRejectedValue(new RequestError('https://x/api', 502));

    await renderAsync(LatestArticles({}));

    expect(screen.getByRole('alert')).toHaveTextContent('failed with 502');
  });
});
