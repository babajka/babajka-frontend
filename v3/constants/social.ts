// Ported from legacy `constants/social.js` (the parts the layout shell uses).
// Podcast badges and episode links are added with the article page (Phase 4).

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

export const PODCASTS_PLATFORMS = [
  {
    id: 'applepodcasts',
    label: 'Apple Podcasts',
    link: 'https://podcasts.apple.com/by/podcast/id1511316106',
  },
  { id: 'yandexmusic', label: 'Yandex Music', link: 'https://music.yandex.ru/album/10622616' },
  {
    id: 'spotifypodcasts',
    label: 'Spotify',
    link: 'https://open.spotify.com/show/61Q5hmZfpw3fDoNM6cGir5',
  },
  {
    id: 'youtubepodcasts',
    label: 'YouTube Podcasts',
    link: 'https://www.youtube.com/@WirBy/podcasts',
  },
  { id: 'soundcloudpodcasts', label: 'SoundCloud', link: 'https://soundcloud.com/user-779783062' },
  { id: 'castboxpodcasts', label: 'Castbox', link: 'https://castbox.fm/vc/2834723' },
  { id: 'overcastpodcasts', label: 'Overcast', link: 'https://overcast.fm/itunes1511316106' },
] as const;

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
