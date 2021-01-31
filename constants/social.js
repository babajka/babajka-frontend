export const NETWORKS = [
  {
    id: 'facebook',
    label: 'Facebook',
    link: 'https://facebook.com/wirdotby',
    color: '#3b5998',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    link: 'https://instagram.com/wir_by',
    color: '#517fa4',
  },
  {
    id: 'vk',
    label: 'ВКонтакте',
    link: 'https://vk.com/wir_by',
    color: '#45668e',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    link: 'https://t.me/wir_by',
    color: '#0088cc',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    link: 'https://twitter.com/wir_by',
    color: '#1da1f2',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    link: 'https://www.youtube.com/c/WirBy',
    color: '#bb0000',
  },
];

export const YOUTUBE_EMBED_PREFIX = 'https://www.youtube.com/embed';

export const YANDEX_MUSIC_EMBED_PREFIX = 'https://music.yandex.ru/iframe';

export const YANDEX_MUSIC_ALBUM_ID = '10622616';

const FACEBOOK_APP_ID = '332376853960377';

export const SHARE_NETWORKS = [
  {
    id: 'facebook',
    icon: 'facebook-square',
    baseUrl: 'https://www.facebook.com/dialog/share',
    getParams: href => ({ app_id: FACEBOOK_APP_ID, href }),
  },
  {
    id: 'twitter',
    baseUrl: 'https://twitter.com/share',
    getParams: (url, text) => ({ url, text }),
  },
  {
    id: 'vk',
    baseUrl: 'https://vk.com/share.php',
    getParams: (url, title) => ({ url, title }),
  },
  {
    id: 'telegram',
    icon: 'telegram-plane',
    baseUrl: 'https://telegram.me/share',
    getParams: url => ({ url }),
  },
  {
    id: 'odnoklassniki',
    baseUrl: 'https://connect.ok.ru/offer',
    getParams: (url, title) => ({ url, title }),
  },
];

export const PODCASTS_PLATFORMS = [
  {
    id: 'yandexmusic',
    label: 'Yandex Music',
    link: 'https://music.yandex.ru/album/10622616',
  },
  {
    id: 'applepodcasts',
    label: 'Apple Podcasts',
    link:
      'https://podcasts.apple.com/by/podcast/wir-by-беларуская-і-сусветная-культура/id1511316106',
  },
  {
    id: 'googlepodcasts',
    label: 'Google Podcasts',
    link: 'https://podcasts.google.com/feed/aHR0cHM6Ly93aXIuYnkvcnNzL3BvZGNhc3RzLw',
  },
  // {
  //   id: 'vkpodcasts',
  //   label: 'VK',
  //   link: 'https://vk.com/podcasts-160609284',
  // },
  {
    id: 'soundcloudpodcasts',
    label: 'SoundCloud',
    link: 'https://soundcloud.com/user-779783062',
  },
  {
    id: 'castboxpodcasts',
    label: 'Castbox',
    link: 'https://castbox.fm/vc/2834723',
  },
  {
    id: 'spotifypodcasts',
    label: 'Spotify',
    link: 'https://open.spotify.com/show/61Q5hmZfpw3fDoNM6cGir5',
  },
];

export const GA_ID = 'UA-117143376-2';
export const YM_ID = 57206620;

export const DEFAULT_KEYWORDS = [
  // common
  'wir',
  'wirby',
  'vir',
  'virby',
  'вір',
  'вірбай',
  'вир',
  'вирбай',
  // be
  'культура',
  'беларуская культура',
  'беларуская мова',
  'гуманітарныя навукі',
  'сусветная культура',
  'мастацтва',
  'кіно',
  'літаратура',
  'паэзія',
  'музыка',
  // ru
  'культура',
  'беларусская культура',
  'белорусская культура',
  'гуманитарные науки',
  'всемирная культура',
  'искусство',
  'кино',
  'литература',
  'поэзия',
  'музыка',
  // en
  'culture',
  'belarusian culture',
  'humanities',
  'world culture',
  'art',
  'cinema',
  'literature',
  'poetry',
  'music',
].join(', ');
