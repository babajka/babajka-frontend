// Ported from legacy `constants/social.js` (the parts the layout shell uses).

import {
  FacebookIcon,
  FacebookSquareIcon,
  InstagramIcon,
  OdnoklassnikiIcon,
  TelegramIcon,
  TelegramPlaneIcon,
  TwitterIcon,
  VkIcon,
  YoutubeIcon,
} from '@/components/icons';

export const FACEBOOK_APP_ID = '332376853960377';
export const TWITTER_HANDLE = '@wir_by';

export const YOUTUBE_EMBED_PREFIX = 'https://www.youtube.com/embed';
export const YANDEX_MUSIC_EMBED_PREFIX = 'https://music.yandex.ru/iframe';

/** Our pages in social networks (footer, error page). */
export const NETWORKS = [
  {
    id: 'facebook',
    label: 'Facebook',
    link: 'https://facebook.com/wirdotby',
    color: '#3b5998',
    Icon: FacebookIcon,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    link: 'https://instagram.com/wir_by',
    color: '#517fa4',
    Icon: InstagramIcon,
  },
  { id: 'vk', label: 'ВКонтакте', link: 'https://vk.com/wir_by', color: '#45668e', Icon: VkIcon },
  {
    id: 'telegram',
    label: 'Telegram',
    link: 'https://t.me/wir_by',
    color: '#0088cc',
    Icon: TelegramIcon,
  },
  {
    id: 'twitter',
    label: '𝕏 (Twitter)',
    link: 'https://x.com/wir_by',
    color: '#1da1f2',
    Icon: TwitterIcon,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    link: 'https://www.youtube.com/c/WirBy',
    color: '#bb0000',
    Icon: YoutubeIcon,
  },
] as const;

/** Share dialogs (ShareButtons). */
export const SHARE_NETWORKS = [
  {
    id: 'facebook',
    Icon: FacebookSquareIcon,
    baseUrl: 'https://www.facebook.com/dialog/share',
    getParams: (href: string) => ({ app_id: FACEBOOK_APP_ID, href }),
  },
  {
    id: 'twitter',
    Icon: TwitterIcon,
    baseUrl: 'https://twitter.com/share',
    getParams: (url: string, text: string) => ({ url, text }),
  },
  {
    id: 'vk',
    Icon: VkIcon,
    baseUrl: 'https://vk.com/share.php',
    getParams: (url: string, title: string) => ({ url, title }),
  },
  {
    id: 'telegram',
    Icon: TelegramPlaneIcon,
    baseUrl: 'https://telegram.me/share',
    getParams: (url: string) => ({ url }),
  },
  {
    id: 'odnoklassniki',
    Icon: OdnoklassnikiIcon,
    baseUrl: 'https://connect.ok.ru/offer',
    getParams: (url: string, title: string) => ({ url, title }),
  },
] as const;

const BADGES = 'https://res.cloudinary.com/wir-by/image/upload/c_scale,h_100,f_auto,q_auto';

type PodcastPlatform = {
  id: string;
  label: string;
  link: string;
  badgeLink?: string;
  episodeLink?: (episodeId: string) => string;
};

export const PODCASTS_PLATFORMS: PodcastPlatform[] = [
  {
    id: 'applepodcasts',
    label: 'Apple Podcasts',
    link: 'https://podcasts.apple.com/by/podcast/id1511316106',
    badgeLink: `${BADGES}/v1716138382/production/podcast-platforms/apple.png`,
    episodeLink: id => `https://podcasts.apple.com/by/podcast/id1511316106?i=${id}`,
  },
  {
    id: 'yandexmusic',
    label: 'Yandex Music',
    link: 'https://music.yandex.ru/album/10622616',
    badgeLink: `${BADGES}/v1716139098/production/podcast-platforms/yandex.png`,
    episodeLink: id => `https://music.yandex.com/album/10622616/track/${id}`,
  },
  {
    id: 'spotifypodcasts',
    label: 'Spotify',
    link: 'https://open.spotify.com/show/61Q5hmZfpw3fDoNM6cGir5',
    badgeLink: `${BADGES}/v1716139336/production/podcast-platforms/spotify.png`,
    episodeLink: id => `https://open.spotify.com/episode/${id}`,
  },
  {
    id: 'youtubepodcasts',
    label: 'YouTube Podcasts',
    link: 'https://www.youtube.com/@WirBy/podcasts',
  },
  { id: 'soundcloudpodcasts', label: 'SoundCloud', link: 'https://soundcloud.com/user-779783062' },
  { id: 'castboxpodcasts', label: 'Castbox', link: 'https://castbox.fm/vc/2834723' },
  { id: 'overcastpodcasts', label: 'Overcast', link: 'https://overcast.fm/itunes1511316106' },
];

export const DEFAULT_KEYWORDS = [
  'wir',
  'wirby',
  'vir',
  'virby',
  'вір',
  'вірбай',
  'вир',
  'вирбай',
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
