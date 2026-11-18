// Ported from the legacy `lib` submodule (`lib/utils/parseYoutubeUrl.js`).
const YOUTUBE_URL_REGEX = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]{11}).*/;

/** Returns the YouTube video id, or `null` if `url` is not a YouTube video URL. */
const parseYoutubeUrl = (url: string) => YOUTUBE_URL_REGEX.exec(url)?.[1] ?? null;

export default parseYoutubeUrl;
