import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

// proxy.ts reads the env at module load, so import it fresh for each env.
const loadProxy = async (env: Record<string, string>) => {
  vi.resetModules();
  Object.entries(env).forEach(([key, value]) => vi.stubEnv(key, value));
  return (await import('@/proxy')).proxy;
};

const request = (path: string) => new NextRequest(new URL(path, 'https://wir.skarb.click'));

describe('proxy', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should not touch responses without NOINDEX', async () => {
    const proxy = await loadProxy({ NOINDEX: '' });
    const response = proxy(request('/api/articles'));

    expect(response.headers.get('X-Robots-Tag')).toBeNull();
    expect(response.headers.get('x-middleware-rewrite')).toBeNull();
  });

  it('should send X-Robots-Tag on pages with NOINDEX=true', async () => {
    const proxy = await loadProxy({ NOINDEX: 'true' });
    const response = proxy(request('/'));

    expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
    expect(response.headers.get('x-middleware-rewrite')).toBeNull();
  });

  it('should proxy backend paths itself with NOINDEX=true, keeping the query', async () => {
    const proxy = await loadProxy({ NOINDEX: 'true', BACKEND_URL: 'https://api.example.com' });

    for (const path of ['/api/articles?take=1', '/auth/login', '/test/x', '/api']) {
      const response = proxy(request(path));
      expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(response.headers.get('x-middleware-rewrite')).toBe(`https://api.example.com${path}`);
    }
  });

  it('should not proxy paths that only start like backend paths', async () => {
    const proxy = await loadProxy({ NOINDEX: 'true' });

    expect(proxy(request('/apiary')).headers.get('x-middleware-rewrite')).toBeNull();
  });
});
