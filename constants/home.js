import createConstants from 'lib/utils/createConstants';

export const TOPIC = createConstants(
  'themes',
  'locations',
  'times',
  'personalities',
  'authors',
  'brands'
);

export const TOPICS = Object.keys(TOPIC);
