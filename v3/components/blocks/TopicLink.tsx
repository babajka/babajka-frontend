import { Fragment } from 'react';

import { TagLink, renderTag } from '@/components/tags';
import Link from '@/components/ui/Link';
import type { Lang, Topic } from '@/constants';
import { createT } from '@/lib/i18n/dict';
import { routes } from '@/lib/routes';
import type { LocalizedTag } from '@/utils/getters';

type TopicLinkProps = {
  lang: Lang;
  topic: Topic;
  dark?: boolean;
  /** `all_mainPage`: "All themes". `one`: the name of one tag's topic. */
  postfix?: 'all_mainPage' | 'one';
};

/** Legacy getTopicLink. */
export const TopicLink = ({ lang, topic, dark, postfix = 'all_mainPage' }: TopicLinkProps) => (
  <Link href={routes.topic(lang, topic)} dark={dark}>
    {createT(lang)(`topic.${topic}_${postfix}`)}
  </Link>
);

type TagNameLinkProps = { lang: Lang; tag: LocalizedTag; dark?: boolean };

/** Legacy getTagLink. */
export const TagNameLink = ({ lang, tag, dark }: TagNameLinkProps) => (
  <TagLink lang={lang} topic={tag.topicSlug} tag={String(tag.slug)} dark={dark}>
    {renderTag(tag)}
  </TagLink>
);

/** Tag links separated by commas (legacy renderNodeList). */
export const TagNameLinks = ({ lang, tags }: { lang: Lang; tags: LocalizedTag[] }) =>
  tags.map((tag, index) => (
    <Fragment key={String(tag.slug)}>
      {index > 0 && <span>,&nbsp;</span>}
      <TagNameLink lang={lang} tag={tag} />
    </Fragment>
  ));
