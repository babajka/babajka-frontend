import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import LatestArticles from '@/components/LatestArticles';
import { getArticles } from '@/lib/loaders';
import { RequestError } from '@/lib/request';

vi.mock('next/server', () => ({ connection: () => Promise.resolve() }));
// plain <img> stand-in for next/image in jsdom
vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));
vi.mock('@/lib/loaders', () => ({ getArticles: vi.fn() }));

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
    vi.mocked(getArticles).mockReset();
  });

  it('should render articles from the backend', async () => {
    vi.mocked(getArticles).mockResolvedValue({ data: [ARTICLE], total: 42 });

    const { container } = await renderAsync(LatestArticles({}));

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Купала');
    expect(screen.getByText('Паэт')).toBeInTheDocument();
    expect(screen.getByText('15 студзеня 2024')).toBeInTheDocument();
    expect(screen.getByText(/42 articles on api\.wir\.by/)).toBeInTheDocument();
    // decorative cover (alt=""), so it has no `img` role
    expect(container.querySelector('img')).toHaveAttribute('src', '/api/files/abc');
  });

  it('should skip a missing or invalid date instead of failing the page', async () => {
    vi.mocked(getArticles).mockResolvedValue({
      data: [
        { ...ARTICLE, publishAt: undefined },
        { ...ARTICLE, _id: '2', publishAt: 'not a date' },
      ],
      total: 2,
    });

    const { container } = await renderAsync(LatestArticles({}));

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2);
    expect(container.querySelector('time')).toBeNull();
  });

  it('should show an error instead of failing the page', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(getArticles).mockRejectedValue(new RequestError('https://x/api', 502));

    await renderAsync(LatestArticles({}));

    expect(screen.getByRole('alert')).toHaveTextContent('failed with 502');
  });
});
