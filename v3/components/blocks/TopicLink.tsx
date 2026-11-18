import { TagLink, renderTag } from '@/components/tags';
import Link from '@/components/ui/Link';
import type { Lang, Topic } from '@/constants';
import { createT } from '@/lib/i18n/dict';
import { routes } from '@/lib/routes';
import type { LocalizedTag } from '@/utils/getters';

type TopicLinkProps = { lang: Lang; topic: Topic; dark?: boolean };

/** "All themes" and so on (legacy getTopicLink). */
export const TopicLink = ({ lang, topic, dark }: TopicLinkProps) => (
  <Link href={routes.topic(lang, topic)} dark={dark}>
    {createT(lang)(`topic.${topic}_all_mainPage`)}
  </Link>
);

type TagNameLinkProps = { lang: Lang; tag: LocalizedTag; dark?: boolean };

/** Legacy getTagLink. */
export const TagNameLink = ({ lang, tag, dark }: TagNameLinkProps) => (
  <TagLink lang={lang} topic={tag.topicSlug} tag={String(tag.slug)} dark={dark}>
    {renderTag(tag)}
  </TagLink>
);
