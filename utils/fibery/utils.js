import { FIBERY_HOST } from 'constants';

import isUrl from 'lib/utils/isUrl';

export const getUrl = src => {
  if (isUrl(src)) {
    return src;
  }
  return `${FIBERY_HOST}${src}`;
};

export const a = 1;
