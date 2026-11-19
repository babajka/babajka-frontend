import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import TinderGame, { type TinderProfile } from './TinderGame';

vi.mock('@/components/social/ShareButtons', () => ({ default: () => null }));

const profile = (id: string): TinderProfile => ({
  id,
  nickname: `Name ${id}`,
  photoUrl: `/${id}.png`,
  description: `About ${id}`,
  acceptMessage: `Hello from ${id}`,
});

const getStats = (fetchMock: ReturnType<typeof vi.fn>) =>
  JSON.parse(fetchMock.mock.calls[0][1].body as string);

describe('TinderGame', () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });

  beforeEach(() => {
    fetchMock.mockClear();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('shows the next profile after a dislike and posts the stats', () => {
    render(<TinderGame title="Game" profiles={[profile('a')]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Не падабаецца' }));

    expect(getStats(fetchMock)).toEqual({
      slug: 'belarusian-writers',
      action: 'dislike',
      personId: 'a',
    });
    expect(screen.getByText('Вы праглядзелі ўсе профілі')).toBeInTheDocument();
  });

  it('opens the match after a like and goes on from there', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    render(<TinderGame title="Game" profiles={[profile('a')]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Падабаецца' }));
    expect(screen.getByText('Hello from a')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Дзякуй!' }));
    expect(screen.queryByText('Hello from a')).not.toBeInTheDocument();
    expect(screen.getByText('Вы праглядзелі ўсе профілі')).toBeInTheDocument();
  });

  it('keeps playing when the stats request fails', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockRejectedValueOnce(new Error('offline'));
    render(<TinderGame title="Game" profiles={[profile('a')]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Не падабаецца' }));

    expect(screen.getByText('Вы праглядзелі ўсе профілі')).toBeInTheDocument();
  });
});
