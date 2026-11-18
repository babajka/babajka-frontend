import type { ReactNode } from 'react';

import type { Lang, Topic } from '@/constants';
import Link from '@/components/ui/Link';
import type { LinkStyleProps } from '@/components/ui/link-class';
import { routes } from '@/lib/routes';
import type { LocalizedTag } from '@/utils/getters';

// Legacy utils/features/tags.js (the parts the layout shell uses).

type TagContent = { title?: string; name?: string; firstName?: string; lastName?: string };

/** Display name of a tag, by topic. */
export const renderTag = ({ topicSlug, content }: Pick<LocalizedTag, 'topicSlug' | 'content'>) => {
  const { title, name, firstName, lastName } = content as TagContent;
  switch (topicSlug) {
    case 'authors':
      return `${firstName} ${lastName}`;
    case 'personalities':
      return name;
    default:
      return title;
  }
};

type TagLinkProps = LinkStyleProps & {
  lang: Lang;
  topic: Topic;
  tag: string;
  className?: string;
  children: ReactNode;
};

export const TagLink = ({ lang, topic, tag, children, ...props }: TagLinkProps) => (
  <Link href={routes.tag(lang, topic, tag)} {...props}>
    {children}
  </Link>
);
