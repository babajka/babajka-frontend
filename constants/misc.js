import createConstants from 'lib/utils/createConstants';

import { TOPICS } from 'constants';

export const TOPIC = createConstants(...TOPICS);

export const DIARY_PICTURE_WIDTH = 180;

// TODO(drapegnik): to get from DB.
export const CROWDFUNDING_ENABLED = true;
export const CROWDFUNDING_OPTIONS = {
  // TODO: to set proper language ( /be/ ) based on our interface locale.
  link: 'https://molamola.by/be/campaigns/2360',
};
