import { revalidateTag } from 'next/cache';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { POST } from '@/app/revalidate/route';

vi.mock('next/cache', () => ({ revalidateTag: vi.fn() }));

const post = (body: unknown, authorization?: string) =>
  POST(
    new Request('https://wir.skarb.click/revalidate', {
      method: 'POST',
      headers: authorization ? { authorization } : {},
      body: typeof body === 'string' ? body : JSON.stringify(body),
    })
  );

describe('POST /revalidate', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.mocked(revalidateTag).mockReset();
  });

  it('should be disabled (404) without REVALIDATE_SECRET', async () => {
    vi.stubEnv('REVALIDATE_SECRET', '');
    expect((await post({ tags: ['articles'] }, 'Bearer x')).status).toBe(404);
  });

  it('should reject a missing or wrong secret, of any length', async () => {
    vi.stubEnv('REVALIDATE_SECRET', 's3cret');

    for (const authorization of [undefined, 'Bearer nope', 'Bearer s3cret-but-longer', 's3cret']) {
      expect((await post({ tags: ['articles'] }, authorization)).status).toBe(401);
    }
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('should reject bad bodies', async () => {
    vi.stubEnv('REVALIDATE_SECRET', 's3cret');

    for (const body of [
      'not json',
      {},
      { tags: [] },
      { tags: [1] },
      { tags: Array(51).fill('a') },
    ]) {
      expect((await post(body, 'Bearer s3cret')).status).toBe(400);
    }
  });

  it('should revalidate the given tags with the max profile', async () => {
    vi.stubEnv('REVALIDATE_SECRET', 's3cret');

    const response = await post({ tags: ['articles', 'article:kupala'] }, 'Bearer s3cret');

    expect(await response.json()).toEqual({ revalidated: ['articles', 'article:kupala'] });
    expect(revalidateTag).toHaveBeenCalledWith('articles', 'max');
    expect(revalidateTag).toHaveBeenCalledWith('article:kupala', 'max');
  });
});
