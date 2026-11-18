// Ported from the legacy `lib` submodule (`lib/utils/parseYMPlaylistUrl.test.js`).
import { describe, expect, it } from 'vitest';
import parseYMPlaylistUrl from '@/lib/utils/parseYMPlaylistUrl';

describe('lib/utils/parseYMPlaylistUrl', () => {
  it('should extract playlist info from yandex music com', () => {
    expect(parseYMPlaylistUrl('https://music.yandex.com/users/testuser/playlists/1234567')).toEqual(
      {
        playlistUsername: 'testuser',
        playlistId: '1234567',
      }
    );
  });

  it('should extract playlist info from yandex music ru', () => {
    expect(parseYMPlaylistUrl('https://music.yandex.ru/users/testuser/playlists/1234567')).toEqual({
      playlistUsername: 'testuser',
      playlistId: '1234567',
    });
  });

  it('should extract playlist info from yandex music by', () => {
    expect(parseYMPlaylistUrl('https://music.yandex.by/users/testuser/playlists/1234567')).toEqual({
      playlistUsername: 'testuser',
      playlistId: '1234567',
    });
  });

  it('should return null for URL without protocol', () => {
    expect(parseYMPlaylistUrl('music.yandex.ru/users/testuser/playlists/1234567')).toBe(null);
  });

  it('should return null for invalid URL', () => {
    expect(parseYMPlaylistUrl('not-a-yandex-music-url')).toBe(null);
  });

  it('should return null for empty string', () => {
    expect(parseYMPlaylistUrl('')).toBe(null);
  });

  it('should return null for non-yandex URL', () => {
    expect(parseYMPlaylistUrl('https://spotify.com/user playlist/123')).toBe(null);
  });

  it('should handle user with email-like username', () => {
    expect(
      parseYMPlaylistUrl('https://music.yandex.ru/users/user@domain.com/playlists/123')
    ).toEqual({
      playlistUsername: 'user@domain.com',
      playlistId: '123',
    });
  });

  it('should handle user with hyphen in username', () => {
    expect(
      parseYMPlaylistUrl('https://music.yandex.ru/users/test-user-name/playlists/123')
    ).toEqual({
      playlistUsername: 'test-user-name',
      playlistId: '123',
    });
  });
});
