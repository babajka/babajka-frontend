// Ported from the legacy `lib` submodule (`lib/utils/parseYoutubeUrl.test.js`).
import { describe, expect, it } from 'vitest';
import parseYoutubeUrl from '@/lib/utils/parseYoutubeUrl';

describe('lib/utils/parseYoutubeUrl', () => {
  it('should extract video ID from standard YouTube URL', () => {
    expect(parseYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('should extract video ID from youtu.be short URL', () => {
    expect(parseYoutubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('should extract video ID from embed URL', () => {
    expect(parseYoutubeUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('should extract video ID from v/ URL', () => {
    expect(parseYoutubeUrl('https://www.youtube.com/v/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('should extract video ID from u/ URL', () => {
    expect(parseYoutubeUrl('https://www.youtube.com/u/1/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('should return null for invalid URL', () => {
    expect(parseYoutubeUrl('not-a-youtube-url')).toBe(null);
  });

  it('should return null for empty string', () => {
    expect(parseYoutubeUrl('')).toBe(null);
  });

  it('should return null for non-YouTube URL', () => {
    expect(parseYoutubeUrl('https://vimeo.com/123456789')).toBe(null);
  });

  it('should handle URL with additional query parameters', () => {
    expect(parseYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PL123')).toBe(
      'dQw4w9WgXcQ'
    );
  });

  it('should handle URL with timestamp', () => {
    expect(parseYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=120')).toBe(
      'dQw4w9WgXcQ'
    );
  });
});
