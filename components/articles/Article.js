import React from 'react';
import { useRouter } from 'next/router';
import flatten from 'lodash/flatten';
import cn from 'classnames';
import bem from 'bem-css-modules';

import { CROWDFUNDING_CAMPAIGN } from 'constants/misc';

import {
  MetaTitle,
  MetaDescription,
  MetaImage,
  MetaKeywords,
  MetaArticleItems,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';
import AudioPlayer from 'components/common/AudioPlayer';
import VideoPlayer from 'components/common/VideoPlayer';
import Image from 'components/common/Image';
import ExternalLink from 'components/common/ExternalLink';
import Button from 'components/common/Button';
import Text from 'components/common/Text';
import MolamolaIcon from 'components/common/ui/MolamolaIcon';
import ShareButtons from 'components/social/ShareButtons';
import ExCoQuiz from 'components/specials/ex-co-quiz';
import TextWithSeparator from 'lib/components/TextWithSeparator';

import { ArticleShape } from 'utils/customPropTypes';
import { getTagLink, getTagImageRenderer, renderTag } from 'utils/tags';
import { renderNodeList } from 'utils/formatters';
import fiberyRenderer from 'utils/fibery/renderer';
import host from 'utils/host';

import styles from './article.module.scss';

import CollectionNote from './CollectionNote';

import CardsLayout from './layout/CardsLayout';

const b = bem(styles);
const COVER_SIZES = [1200, 1000, 770, 640, 360];

const Article = ({
  data: {
    slug,
    images,
    title,
    subtitle,
    keywords,
    text,
    type,
    audio,
    video,
    tagsByTopic,
    collection,
    publishAt,
    locale,
    suggestedArticles,
  },
}) => {
  const router = useRouter();
  const { brands, authors, ...tagsObject } = tagsByTopic;
  const renderTagImage = getTagImageRenderer({ className: b('tag-image') });
  const imageUrl = images.page || images.horizontal;
  // https://caniuse.com/#feat=array-flat
  const tags = flatten(Object.values(tagsObject));

  return (
    <>
      <MetaTitle title={title} type="article" />
      <MetaDescription description={subtitle} />
      <MetaImage url={imageUrl ? `${host}${imageUrl}` : DEFAULT_IMAGE} />
      <MetaKeywords keywords={keywords} />
      <MetaArticleItems name="author" list={authors.map(renderTag)} />
      <MetaArticleItems name="tag" list={tags.map(renderTag)} />
      <MetaArticleItems name="published_time" value={publishAt} />
      <div>
        <div className={cn('wir-content-padding', styles['article-page-text-content'])}>
          <div className={b('subtitle')}>
            <TextWithSeparator text={subtitle} symbol={'\n'} />
          </div>
        </div>
        {type === 'text' && (
          <Image
            className={b('cover')}
            alt={title}
            sourceSizes={COVER_SIZES}
            baseUrl={images.page}
          />
        )}
      </div>
      <div className={cn('wir-content-padding', b('header'))}>
        {/* TODO: hover corresponding image and title simultaneously */}
        {(!!brands.length || !!authors.length) && (
          <div className={b('tags')}>
            {brands.concat(authors).map(tag =>
              getTagLink({
                className: b('tag-image-link'),
                render: renderTagImage,
                tag,
              })
            )}
            <div className={b('tag-titles')}>
              <span>
                {renderNodeList(brands.map(tag => getTagLink({ tag })))}
                {!!brands.length && !!authors.length && ','}
              </span>
              <span>{renderNodeList(authors.map(tag => getTagLink({ tag })))}</span>
            </div>
          </div>
        )}
        <div className={b('title')}>{title}</div>
      </div>

      <div className="wir-content-padding">
        <div className={styles['article-page-content']}>
          {type === 'audio' && <AudioPlayer trackId={audio.id} />}
          {type === 'video' && <VideoPlayer videoId={video.id} />}

          {collection?.articles.length > 1 && <CollectionNote data={collection} locale={locale} />}

          <div className={styles['article-page-text-content']}>{fiberyRenderer(text.content)}</div>

          {/* FIXME: hardcode */}
          {slug === 'bielaruski' && <ExCoQuiz id="a8822357-22c3-4090-bfe6-765948466bbe" />}

          <div className={b('post-actions')}>
            {CROWDFUNDING_CAMPAIGN.enabled && (
              <ExternalLink href={CROWDFUNDING_CAMPAIGN.options.link}>
                <Button className={b('crowdfunding')} highlighted>
                  <Text id="article.support-crowdfunding" />
                  <span>&nbsp;&nbsp;</span>
                  <MolamolaIcon />
                </Button>
              </ExternalLink>
            )}
            <div className={b('share')}>
              <ShareButtons urlPath={router.asPath} basicText={title} />
            </div>
          </div>
          <div className={b('other-tags')}>
            {tags.map(tag => (
              <div key={tag.slug} className={b('other-tag')}>
                {getTagLink({ tag })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {suggestedArticles && (
        <div>
          <CardsLayout blocks={suggestedArticles.blocks} data={suggestedArticles.data} />
        </div>
      )}
    </>
  );
};

Article.propTypes = {
  data: ArticleShape.isRequired,
};

export default Article;
