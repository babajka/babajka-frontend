import { Fragment } from 'react';

import TagImage from '@/components/TagImage';
import { VolumeUpIcon, YoutubeIcon } from '@/components/icons';
import { renderTag } from '@/components/tags';
import Image from '@/components/ui/Image';
import Picture, { SCREENS, type Screen } from '@/components/ui/Picture';
import { linkClass } from '@/components/ui/link-class';
import type { Lang } from '@/constants';
import { createT } from '@/lib/i18n/dict';
import { routes } from '@/lib/routes';
import type { LocalizedArticle, LocalizedTag } from '@/utils/getters';

import CardWrapper, { type CardTheme } from './CardWrapper';
import { ARTICLE_CARD_CONTEXTS, type ArticleCardContext, type ArticleCardSize } from './sizes';

type ArticleType = 'text' | 'audio' | 'video';

/** The fields of a backend article that the card reads. */
type CardFields = {
  slug: string;
  title: string;
  subtitle: string;
  color: string;
  theme?: CardTheme;
  type: ArticleType;
  images: { horizontal?: string; vertical?: string };
};

const ACTION_BY_TYPE = {
  text: { short: 'article.read', full: 'article.read-article' },
  audio: { short: 'article.listen', full: 'article.listen-podcast' },
  video: { short: 'article.watch', full: 'article.watch-video' },
} as const;

const COVER_BY_CARD_SIZE: Record<
  ArticleCardSize,
  { type: keyof CardFields['images']; width: number }
> = {
  xxl: { type: 'vertical', width: 390 },
  xl: { type: 'vertical', width: 313 },
  l: { type: 'vertical', width: 240 },
  m: { type: 'vertical', width: 186 },
  'square-m': { type: 'horizontal', width: 390 },
  'square-s': { type: 'horizontal', width: 300 },
};

const COLLECTION_LOGO_WIDTH = 70;
const COLLECTIONS_HIDE_COVER = new Set(['starbellit']);
const COLLECTIONS_HIDE_COMPLETELY = new Set(['bahdanovicz', 'vierszy2020']);

const getCoverSources = (images: CardFields['images'], context: ArticleCardContext) =>
  Object.fromEntries(
    SCREENS.map(screen => {
      const { type, width } = COVER_BY_CARD_SIZE[ARTICLE_CARD_CONTEXTS[context].sizes[screen]];
      return [screen, `${images[type]}?w=${width * 2}`];
    })
  ) as Record<Screen, string>;

type ArticleCardProps = {
  article: LocalizedArticle;
  lang: Lang;
  context: ArticleCardContext;
  inViewport?: boolean;
  onBackground?: boolean;
};

/** Legacy features/layout/cards/article.js. */
const ArticleCard = ({ article, lang, context, inViewport, onBackground }: ArticleCardProps) => {
  const {
    slug,
    title,
    subtitle,
    color,
    theme = 'light',
    type,
    images,
  } = article as unknown as CardFields;
  const t = createT(lang);
  const { brands = [], authors = [] } = (article.tagsByTopic ?? {}) as Partial<
    Record<'brands' | 'authors', LocalizedTag[]>
  >;
  const { short, full } = ACTION_BY_TYPE[type] ?? ACTION_BY_TYPE.text;
  const dark = theme !== 'light';

  const collection =
    article.collection && !COLLECTIONS_HIDE_COMPLETELY.has(article.collection.slug)
      ? article.collection
      : null;

  return (
    <CardWrapper
      href={routes.article(lang, slug)}
      sizeClassName={ARTICLE_CARD_CONTEXTS[context].className}
      className="article-card"
      color={color}
      theme={theme}
      slug={slug}
      onBackground={onBackground}
      slavics={collection?.slug === 'slav-movy'}
      dataAttributes={{
        'data-collection': collection ? true : undefined,
        'data-brand': brands.length ? true : undefined,
      }}
    >
      <div className="article-card__cover-box" data-collection={collection ? true : undefined}>
        {(images.horizontal || images.vertical) && (
          <Picture
            className="article-card__cover"
            sources={getCoverSources(images, context)}
            alt={title}
            inViewport={inViewport}
          />
        )}
      </div>
      <div className="article-card__content">
        {collection && (
          <div className="article-card__collection">
            <div className="grow">
              <div className="article-card__order">
                {collection.articleIndex + 1} {t('article.collection-part')}
              </div>
              <div className="article-card__collection-name">{collection.name}</div>
            </div>
            {collection.cover && !COLLECTIONS_HIDE_COVER.has(collection.slug) && (
              <Image
                className="size-[70px] rounded-full"
                alt={collection.name ?? ''}
                size={COLLECTION_LOGO_WIDTH}
                baseUrl={collection.cover}
                inViewport={inViewport}
              />
            )}
          </div>
        )}
        {collection && <div className="grow" />}
        <div className="article-card__title">
          {type === 'audio' && <VolumeUpIcon className="mr-4" />}
          {type === 'video' && <YoutubeIcon className="mr-4" />}
          {title}
        </div>
        {!collection && (
          <div className="article-card__description">
            <div className="article-card__description-text">{subtitle}</div>
            <div className={linkClass({ dark })}>{t(short)}</div>
          </div>
        )}
        {!collection && <div className="article-card__filler-middle" />}
        <div className="article-card__author">
          {brands.map(brand => (
            <TagImage
              key={String(brand.slug)}
              tag={brand}
              theme={theme}
              className="article-card__brand"
              inViewport={inViewport}
            />
          ))}
          <span>
            {authors.map((author, index) => (
              <Fragment key={String(author.slug)}>
                {index > 0 && <span>,&nbsp;</span>}
                {renderTag(author)}
              </Fragment>
            ))}
          </span>
        </div>
        {!collection && <div className="article-card__filler-bottom" />}
        {!collection && (
          <div className="article-card__label">
            <span className={linkClass({ dark })}>{t(full)}</span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default ArticleCard;
