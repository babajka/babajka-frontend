import createConstants from 'lib/utils/createConstants';

import { TOPICS } from 'constants';

export const TOPIC = createConstants(...TOPICS);

export const DIARY_PICTURE_WIDTH = 180;

export const REVALIDATE_TIMEOUT = 60; // seconds

// TODO(drapegnik): to get from DB Storage.
// https://dev.wir.by/api/storage/byKey/features
export const CROWDFUNDING_CAMPAIGN = {
  enabled: false,
  options: {
    link: 'https://molamola.by/campaigns/2449',
  },
};
