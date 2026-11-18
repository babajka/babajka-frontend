import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import AboutPage, { generateMetadata } from '@/app/[lang]/(site)/about/page';

vi.mock('@/lib/i18n/server', () => ({
  getLang: () => Promise.resolve('ru'),
  getT: () => Promise.resolve((id: string) => id),
  Text: ({ id }: { id: string }) => id,
}));

describe('about page', () => {
  it('renders the heading and the text', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('about.section1-header');
    expect(screen.getByText('about.section1-text')).toBeInTheDocument();
  });

  it('has its own metadata with the localized url', async () => {
    const metadata = await generateMetadata();

    expect(metadata.title).toBe('about.meta-title');
    expect(metadata.description).toBe('about.meta-description');
    expect(metadata.keywords).toBe('about.meta-keywords');
    expect(metadata.openGraph).toMatchObject({ url: '/ru/about' });
    expect(metadata.twitter).toMatchObject({ card: 'summary' });
  });
});
