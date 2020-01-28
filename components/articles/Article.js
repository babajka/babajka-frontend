import 'styles/pages/article.scss';

import React from 'react';
import { useRouter } from 'next/router';
import flatten from 'lodash/flatten';

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
import ShareButtons from 'components/social/ShareButtons';

import { ArticleShape } from 'utils/customPropTypes';
import { getTagLink, getTagImageRenderer, renderTag } from 'utils/tags';
import { renderNodeList } from 'utils/formatters';
import fiberyRenderer from 'utils/fibery/renderer';
import host from 'utils/host';

import CollectionNote from './CollectionNote';

const COVER_SIZES = [1200, 1000, 770, 640, 360];

const Article = ({
  data: {
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
  },
}) => {
  const router = useRouter();
  const { brands, authors, ...tagsObject } = tagsByTopic;
  const renderTagImage = getTagImageRenderer({ className: 'article-page__tag-image' });
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
      <div className="article-page">
        <div className="wir-content-padding article-page-content">
          <div className="article-page__subtitle">{subtitle}</div>
        </div>
        {type === 'text' && (
          <Image
            className="article-page__cover"
            alt={title}
            sourceSizes={COVER_SIZES}
            baseUrl={images.page}
          />
        )}
      </div>
      <div className="wir-content-padding article-page__header">
        {/* TODO: hover corresponding image and title simultaneously */}
        {(!!brands.length || !!authors.length) && (
          <div className="article-page__tags">
            {brands.concat(authors).map(tag =>
              getTagLink({
                className: 'article-page__tag-image-link',
                render: renderTagImage,
                tag,
              })
            )}
            <div className="article-page__tag-titles">
              <span>
                {renderNodeList(brands.map(tag => getTagLink({ tag })))}
                {!!brands.length && !!authors.length && ','}
              </span>
              <span>{renderNodeList(authors.map(tag => getTagLink({ tag })))}</span>
            </div>
          </div>
        )}
        <div className="article-page__title">{title}</div>
      </div>

      <div className="wir-content-padding">
        <div className="article-page-content">
          {type === 'audio' && <AudioPlayer trackId={audio.id} />}
          {type === 'video' && <VideoPlayer videoId={video.id} />}
          {collection && collection.articles.length > 1 && <CollectionNote data={collection} />}
          {fiberyRenderer(text.content)}
        </div>
        <div className="article-page__share">
          <ShareButtons urlPath={router.asPath} text={{ basic: title }} />
        </div>
        <div className="article-page__other-tags">
          {tags.map(tag => (
            <div key={tag.slug} className="article-page__other-tag">
              {getTagLink({ tag })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

Article.propTypes = {
  data: ArticleShape.isRequired,
};

export default Article;
