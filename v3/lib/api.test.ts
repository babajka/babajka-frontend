import { afterEach, describe, expect, it, vi } from 'vitest';

import { BACKEND_URL, getLatestArticles, RequestError } from '@/lib/api';

const mockFetch = (response: Partial<Response>) => {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

describe('lib/api', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getLatestArticles', () => {
    it('should request the articles chunk from the backend', async () => {
      const chunk = { data: [], total: 0 };
      const fetchMock = mockFetch({ ok: true, json: () => Promise.resolve(chunk) });

      await expect(getLatestArticles(6)).resolves.toEqual(chunk);
      expect(fetchMock).toHaveBeenCalledWith(
        `${BACKEND_URL}/api/articles?skip=0&take=6`,
        expect.objectContaining({ headers: { accept: 'application/json' } })
      );
    });

    it('should throw RequestError on a non-2xx response', async () => {
      mockFetch({ ok: false, status: 502 });

      const error = await getLatestArticles(1).catch(e => e);
      expect(error).toBeInstanceOf(RequestError);
      expect(error).toMatchObject({
        status: 502,
        url: `${BACKEND_URL}/api/articles?skip=0&take=1`,
      });
    });
  });
});
