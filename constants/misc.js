import createConstants from 'lib/utils/createConstants';

import { TOPICS } from 'constants';

export const TOPIC = createConstants(...TOPICS);

export const TAG_BLOCK_SIZE = 10;

export const TAG_LEVELS_SIZES = [2, 3, 2, 3];
