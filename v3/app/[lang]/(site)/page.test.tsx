import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import MainPage from '@/app/[lang]/(site)/page';
import { getDiary, getLocalizedMainPage } from '@/lib/loaders';
import { localizeData, type RawArticle } from '@/utils/getters';

vi.mock('@/lib/i18n/server', () => ({
  getLang: () => Promise.resolve('be'),
  getT: () => Promise.resolve((id: string) => id),
}));
vi.mock('@/lib/loaders', () => ({ getDiary: vi.fn(), getLocalizedMainPage: vi.fn() }));
vi.mock('@/components/blocks/DiaryBlock', () => ({
  default: ({ initial }: { initial: { data: { slug: string } } }) => <p>{initial.data.slug}</p>,
}));

const article = {
  _id: 'a1',
  color: '#123456',
  theme: 'dark',
  type: 'text',
  images: { horizontal: '/h.png', vertical: '/v.png' },
  tags: [],
  locales: { be: { slug: 'slug-be', title: 'Загаловак', subtitle: 'Падзагаловак' } },
};

describe('app/[lang]/(site)/page', () => {
  beforeEach(() => {
    vi.mocked(getDiary).mockReset();
  });

  it('renders the blocks with localized articles', async () => {
    vi.mocked(getLocalizedMainPage).mockResolvedValue({
      blocks: [{ type: 'featured', frozen: true, articleId: 'a1' }],
      data: localizeData({ articles: [article as unknown as RawArticle] }, 'be'),
    } as never);

    render(await MainPage());

    expect(screen.getByRole('link')).toHaveAttribute('href', '/be/article/slug-be');
    expect(screen.getByText('Загаловак')).toBeInTheDocument();
    expect(getDiary).not.toHaveBeenCalled();
  });

  it('loads the diary only when the page has its block', async () => {
    vi.mocked(getLocalizedMainPage).mockResolvedValue({
      blocks: [{ type: 'diary' }],
      data: {},
    } as never);
    vi.mocked(getDiary).mockResolvedValue({ data: { slug: 'today' } } as never);

    render(await MainPage());

    expect(getDiary).toHaveBeenCalledWith('today');
    expect(screen.getByText('today')).toBeInTheDocument();
  });

  it('skips banners that are no longer available', async () => {
    vi.mocked(getLocalizedMainPage).mockResolvedValue({
      blocks: [{ type: 'banner', banner: 'uzrost' }],
      data: {},
    } as never);

    const { container } = render(await MainPage());

    expect(container).toBeEmptyDOMElement();
  });
});
