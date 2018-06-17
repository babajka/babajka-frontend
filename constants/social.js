import { DOMAIN_SECURE } from 'constants';

export const USER_PIC = '/static/images/placeholders/user.png';

export const NETWORKS = [
  {
    name: 'facebook',
    link: 'https://facebook.com/wirdotby',
  },
  {
    name: 'vk',
    link: 'https://vk.com/wir_by',
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/wir_by',
  },
  {
    name: 'telegram',
    link: 'https://t.me/wir_by',
  },
  {
    name: 'youtube',
    link: 'https://www.youtube.com/channel/UCoj_6A55mEPeba8ZfBHqfCw',
  },
  {
    name: 'instagram',
    link: 'https://instagram.com/wir_by',
  },
];

export const EXPORT_TO_NETWORKS = ['facebook', 'vk', 'twitter'];

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

export const GA_ID = 'UA-117143376-1';
