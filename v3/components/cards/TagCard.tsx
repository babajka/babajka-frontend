import Image from '@/components/ui/Image';
import type { Lang } from '@/constants';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils/cn';
import type { LocalizedTag } from '@/utils/getters';

import CardWrapper, { type CardTheme } from './CardWrapper';

type TagContent = {
  theme?: CardTheme;
  color?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  description?: string;
  image?: string;
};

type TagCardProps = {
  tag: LocalizedTag;
  lang: Lang;
  sizeClassName: string;
  inViewport?: boolean;
};

/** Legacy features/layout/cards/tag.js: only locations and personalities have a card. */
const TagCard = ({ tag, lang, sizeClassName, inViewport }: TagCardProps) => {
  const { topicSlug } = tag;
  const { theme, color, title, name, subtitle, description, image } = tag.content as TagContent;
  const wrapper = {
    href: routes.tag(lang, topicSlug, String(tag.slug)),
    sizeClassName,
    theme,
    color,
  };

  if (topicSlug === 'locations') {
    return (
      <CardWrapper {...wrapper} image={image} className={cn('tag-card', 'tag-card__location')}>
        <div className="tag-card__location-title">{title}</div>
      </CardWrapper>
    );
  }

  if (topicSlug === 'personalities') {
    return (
      <CardWrapper {...wrapper} className={cn('tag-card', 'tag-card__person')}>
        <div className="tag-card__cover-box">
          {image && (
            <Image
              className="tag-card__cover"
              alt={name ?? ''}
              title={name}
              size={390}
              baseUrl={image}
              inViewport={inViewport}
            />
          )}
        </div>
        <div className="tag-card__content">
          <div className="tag-card__subtitle">{subtitle}</div>
          <div className="tag-card__title">{name}</div>
          <div className="tag-card__description">{description}</div>
        </div>
      </CardWrapper>
    );
  }

  return null;
};

export default TagCard;
