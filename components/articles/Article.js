import 'styles/pages/article.scss';

import React from 'react';
import { useRouter } from 'next/router';

import { MetaTitle, MetaDescription, MetaImage, MetaKeywords } from 'components/social/Metatags';
import Link from 'components/common/Link';
import AudioPlayer from 'components/common/AudioPlayer';
import VideoPlayer from 'components/common/VideoPlayer';
import Image from 'components/common/Image';
import ShareButtons from 'components/social/ShareButtons';

import { ArticleShape } from 'utils/customPropTypes';
import { getTagLink } from 'utils/tags';
import { renderNodeList } from 'utils/formatters';
import fiberyRenderer from 'utils/fibery/renderer';

import { ROUTES_NAMES } from 'routes';

const COVER_SIZES = [1200, 1000, 770, 640, 360];

const Article = ({
  data: { images, title, subtitle, keywords, text, type, audio, video, tagsByTopic },
}) => {
  const router = useRouter();
  const { brands, authors, ...tags } = tagsByTopic;

  return (
    <>
      <MetaTitle title={title} type="article" />
      <MetaDescription description={subtitle} />
      {/* FIXME: proper social preview image (size) */}
      <MetaImage url={images.page} />
      <MetaKeywords keywords={keywords} />
      <div className="article-page">
        <div className="article-page-margins article-page-content">
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
      <div className="article-page-margins article-page__header">
        {/* TODO: hover corresponding image and title simultaneously */}
        {(!!brands.length || !!authors.length) && (
          <div className="article-page__tags">
            {brands.concat(authors).map(({ topicSlug, slug, content }) => (
              <Link
                key={slug}
                className="article-page__tag-image-link"
                route={ROUTES_NAMES.tag}
                params={{ topic: topicSlug, tag: slug }}
              >
                <img className="article-page__tag-image" src={content.image} alt={slug} />
              </Link>
            ))}
            <div className="article-page__tag-titles">
              <span>{renderNodeList(brands.map(tag => getTagLink({ tag })))}</span>
              <span>{renderNodeList(authors.map(tag => getTagLink({ tag })))}</span>
            </div>
          </div>
        )}
        <div className="article-page__title">{title}</div>
      </div>

      <div className="article-page-margins">
        <div className="article-page-content">
          {type === 'audio' && <AudioPlayer trackId={audio.id} />}
          {type === 'video' && <VideoPlayer videoId={video.id} />}
          {fiberyRenderer(text.content)}
        </div>
        <div className="article-page__share">
          <ShareButtons url={router.asPath} title={title} />
        </div>
        <div className="article-page__other-tags">
          {/* flatMap or flatten? */}
          {Object.values(tags).map(tagList =>
            tagList.map(tag => (
              <div key={tag.slug} className="article-page__other-tag">
                {getTagLink({ tag })}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

Article.propTypes = {
  data: ArticleShape.isRequired,
};

export default Article;
