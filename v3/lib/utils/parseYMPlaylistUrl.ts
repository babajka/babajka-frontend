// Ported from the legacy `lib` submodule (`lib/utils/parseYMPlaylistUrl.js`).
const YM_PLAYLIST_URL_REGEX =
  /(?:http|https)?:\/\/(?:www\.)?music\.yandex\.(?:com|ru|by)\/users\/([\w@.\-+]+)\/playlists\/(\d+)/;

export type YMPlaylist = { playlistUsername: string; playlistId: string };

/** Returns the Yandex Music playlist owner and id, or `null` if `url` is not a playlist URL. */
const parseYMPlaylistUrl = (url: string): YMPlaylist | null => {
  const match = YM_PLAYLIST_URL_REGEX.exec(url);
  if (!match) {
    return null;
  }
  const [, playlistUsername, playlistId] = match;
  return { playlistUsername, playlistId };
};

export default parseYMPlaylistUrl;
