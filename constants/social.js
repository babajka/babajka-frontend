import { DOMAIN_SECURE } from 'constants';

export const USER_PIC = '/static/images/placeholders/user.png';

export const NETWORKS = [
  {
    id: 'facebook',
    label: 'Facebook',
    link: 'https://facebook.com/wirdotby',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    link: 'https://instagram.com/wir_by',
  },
  {
    id: 'vk',
    label: 'ВКонтакте',
    link: 'https://vk.com/wir_by',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    link: 'https://t.me/wir_by',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    link: 'https://twitter.com/wir_by',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    link: 'https://www.youtube.com/channel/UCoj_6A55mEPeba8ZfBHqfCw',
  },
];

export const EXPORT_TO_NETWORKS = ['facebook', 'vk', 'twitter'];

export const YOUTUBE_EMBED_PREFIX = 'https://www.youtube.com/embed';

const FACEBOOK_APP_ID = '332376853960377';

export const NETWORKS_URLS = {
  facebook: ({ url }) =>
    `https://www.facebook.com/dialog/share` +
    `?app_id=${FACEBOOK_APP_ID}` +
    `&href=${DOMAIN_SECURE}${url}`,
  vk: ({ url, title }) =>
    `https://vk.com/share.php?url=${DOMAIN_SECURE}${url}&title=${encodeURI(title)}`,
  twitter: ({ url, title }) =>
    `https://twitter.com/share?url=${DOMAIN_SECURE}${url}&text=${encodeURI(title)}`,
};

export const getGoogleAnalyticsID = isProd => (isProd ? 'UA-117143376-2' : 'UA-117143376-1');
