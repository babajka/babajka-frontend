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

export const renderTag = ({ topicSlug, content }) => RENDER_TAG_CONTENT[topicSlug](content);

export const getTopicLink = ({ topic, dark, postfix = 'all_mainPage' }) => (
  <Link key={topic} route={ROUTES_NAMES.topic} params={{ topic }} dark={dark}>
    <Text id={`topic.${topic}_${postfix}`} />
  </Link>
);

export const getTagLink = ({ tag, tag: { topicSlug, slug }, dark }) => (
  <Link key={slug} route={ROUTES_NAMES.tag} params={{ topic: topicSlug, tag: slug }} dark={dark}>
    {renderTag(tag)}
  </Link>
);
