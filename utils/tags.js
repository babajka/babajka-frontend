import React from 'react';

import Link from 'components/common/Link';
import Text from 'components/common/Text';

import { ROUTES_NAMES } from 'routes';

const renderTitle = ({ title }) => title;

const RENDER_TAG_CONTENT = {
  authors: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  personalities: ({ name }) => name,
  brands: renderTitle,
  locations: renderTitle,
  themes: renderTitle,
  times: renderTitle,
};

export const renderTag = ({ topic: { slug }, content }) => RENDER_TAG_CONTENT[slug](content);

export const getTopicLink = ({ topic, dark }) => (
  <Link route={ROUTES_NAMES.topic} params={{ topic }} dark={dark}>
    <Text id={`topic.${topic}_all_mainPage`} />
  </Link>
);

export const getTagLink = ({ tag, tag: { topic, slug }, dark }) => (
  <Link route={ROUTES_NAMES.tag} params={{ topic: topic.slug, tag: slug }} dark={dark}>
    {renderTag(tag)}
  </Link>
);
