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
    link: 'https://www.youtube.com/channel/UCoj_6A55mEPeba8ZfBHqfCw',
    color: '#bb0000',
  },
];

export const EXPORT_TO_NETWORKS = ['facebook', 'vk', 'twitter'];

export const YOUTUBE_EMBED_PREFIX = 'https://www.youtube.com/embed';

export const SOUNDCLOUD_EMBED_PREFIX = 'https://w.soundcloud.com/player';

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
    id: 'odnoklassniki',
    baseUrl: 'https://connect.ok.ru/offer',
    getParams: (url, title) => ({ url, title }),
  },
];

export const GA_ID = 'UA-117143376-2';

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
