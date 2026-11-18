import Image from '@/components/ui/Image';

import type { CardTheme } from '@/components/cards/CardWrapper';
import type { LocalizedTag } from '@/utils/getters';

// Legacy utils/features/tags.js.
const TAG_IMAGE_HEIGHT = 48;

const BRAND_LOGO_BY_THEME = { dark: 'white', light: 'black' } as const;

type TagImages = { image?: string; images?: Partial<Record<'white' | 'black', string>> };

export const getTagImageUrl = (
  { topicSlug, content }: Pick<LocalizedTag, 'topicSlug' | 'content'>,
  theme: CardTheme = 'light'
) => {
  const { image, images } = content as TagImages;
  return topicSlug === 'brands' ? images?.[BRAND_LOGO_BY_THEME[theme]] : image;
};

type TagImageProps = {
  tag: LocalizedTag;
  theme?: CardTheme;
  className?: string;
  inViewport?: boolean;
};

/** Brand logo or tag picture, 48px high. */
const TagImage = ({ tag, theme, className, inViewport }: TagImageProps) => {
  const url = getTagImageUrl(tag, theme);
  return url ? (
    <Image
      className={className}
      alt={String(tag.slug)}
      size={TAG_IMAGE_HEIGHT}
      baseUrl={url}
      dimension="h"
      inViewport={inViewport}
    />
  ) : null;
};

export default TagImage;
