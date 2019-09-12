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

export const getTopicLink = ({ topic, dark, postfix = 'all_mainPage', ...props }) => (
  <Link key={topic} route={ROUTES_NAMES.topic} params={{ topic }} dark={dark} {...props}>
    <Text id={`topic.${topic}_${postfix}`} />
  </Link>
);

export const TagLink = ({ topic, tag, children, ...props }) => (
  <Link route={ROUTES_NAMES.tag} params={{ topic, tag }} {...props}>
    {children}
  </Link>
);

export const getTagLink = ({ tag, tag: { topicSlug, slug }, dark, ...props }) => (
  <TagLink key={slug} topic={topicSlug} tag={slug} dark={dark} {...props}>
    {renderTag(tag)}
  </TagLink>
);
