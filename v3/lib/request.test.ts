import { afterEach, describe, expect, it, vi } from 'vitest';

import { BACKEND_URL, orNotFound, request, RequestError } from '@/lib/request';

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND');
  },
}));

const mockFetch = (response: Partial<Response> & { contentType?: string }) => {
  const fetchMock = vi.fn().mockResolvedValue({
    headers: new Headers({ 'content-type': response.contentType ?? 'application/json' }),
    ...response,
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

describe('lib/request', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should GET the backend directly and parse JSON', async () => {
    const fetchMock = mockFetch({ ok: true, json: () => Promise.resolve({ a: 1 }) });

    await expect(request('/api/articles')).resolves.toEqual({ a: 1 });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${BACKEND_URL}/api/articles`);
    expect(init).toMatchObject({ method: 'GET', headers: { accept: 'application/json' } });
    expect(init.body).toBeUndefined();
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('should POST JSON bodies', async () => {
    const fetchMock = mockFetch({ ok: true, json: () => Promise.resolve({}) });

    await request('/api/mail', { method: 'POST', body: { email: 'a@b.by' } });
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      method: 'POST',
      body: '{"email":"a@b.by"}',
      headers: { 'content-type': 'application/json' },
    });
  });

  it('should reject a non-JSON 200 response, e.g. a gateway HTML page', async () => {
    mockFetch({ ok: true, status: 200, contentType: 'text/html' });

    const error = await request('/api/x').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(RequestError);
    expect(error).toMatchObject({ status: 200, message: expect.stringContaining('text/html') });
  });

  it('should return text when asked to', async () => {
    const fetchMock = mockFetch({
      ok: true,
      contentType: 'text/plain',
      text: () => Promise.resolve('ok'),
    });
    await expect(request('/api/x', { responseType: 'text' })).resolves.toBe('ok');
    expect(fetchMock.mock.calls[0][1].headers.accept).toBe('*/*');
  });

  it('should throw RequestError with the status', async () => {
    mockFetch({ ok: false, status: 502 });

    const error = await request('/api/x').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(RequestError);
    expect(error).toMatchObject({ status: 502, url: `${BACKEND_URL}/api/x` });
  });

  describe('orNotFound', () => {
    it('should pass data through', async () => {
      await expect(orNotFound(Promise.resolve(1))).resolves.toBe(1);
    });

    it('should call notFound() on a 404, also for plain objects from a cache boundary', async () => {
      await expect(orNotFound(Promise.reject(new RequestError('u', 404)))).rejects.toThrow(
        'NEXT_NOT_FOUND'
      );
      await expect(orNotFound(Promise.reject({ status: 404 }))).rejects.toThrow('NEXT_NOT_FOUND');
    });

    it('should rethrow other errors', async () => {
      const error = new RequestError('u', 500);
      await expect(orNotFound(Promise.reject(error))).rejects.toBe(error);
    });
  });
});
