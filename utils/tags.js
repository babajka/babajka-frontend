import React from 'react';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Image from 'components/common/Image';

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

export const getTagLink = ({
  tag,
  tag: { topicSlug, slug },
  dark,
  render = renderTag,
  ...props
}) => (
  <TagLink key={slug} topic={topicSlug} tag={slug} dark={dark} {...props}>
    {render(tag)}
  </TagLink>
);

const TAG_IMAGE_HEIGHT = 48;
const BRAND_LOGO_BY_THEME = {
  dark: 'white',
  light: 'black',
};

const getTagImageUrl = ({ topicSlug, content: { image, images }, theme }) => {
  if (topicSlug !== 'brands') {
    return image;
  }
  return images[BRAND_LOGO_BY_THEME[theme]];
};

export const getTagImageRenderer = ({ className, theme = 'light' }) => ({
  slug,
  topicSlug,
  content: { title },
  content,
}) => (
  <Image
    key={slug}
    className={className}
    alt={title}
    sourceSizes={[TAG_IMAGE_HEIGHT]}
    baseUrl={getTagImageUrl({ topicSlug, content, theme })}
    mode="x"
    dimension="h"
  />
);
