import createConstants from 'lib/utils/createConstants';

import { TOPICS } from 'constants';

export const TOPIC = createConstants(...TOPICS);

export const DIARY_PICTURE_WIDTH = 180;

// TODO(drapegnik): to get from DB Storage.
// https://dev.wir.by/api/storage/byKey/features
export const CROWDFUNDING_CAMPAIGN = {
  enabled: true,
  options: {
    link: 'https://molamola.by/campaigns/2449',
  },
};
