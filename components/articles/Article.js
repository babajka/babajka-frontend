import 'styles/pages/article.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import { MetaTitle, MetaDescription, MetaImage, MetaKeywords } from 'components/social/Metatags';
import Link from 'components/common/Link';
import AudioPlayer from 'components/common/AudioPlayer';
import VideoPlayer from 'components/common/VideoPlayer';
import ShareButtons from 'components/social/ShareButtons';

import { ArticleShape } from 'utils/customPropTypes';
import { getTagLink } from 'utils/tags';
import { renderNodeList } from 'utils/formatters';
import fiberyRenderer from 'utils/fibery/renderer';

import { ROUTES_NAMES } from 'routes';

const Article = ({ router, data: { images, tags, title, subtitle, keywords, text } }) => {
  // TODO: think about implementing this logic at backend
  const tagsByTopic = tags.reduce((acc, tag) => {
    const {
      topic: { slug },
    } = tag;
    acc[slug] = acc[slug] || [];
    acc[slug].push(tag);
    return acc;
  }, {});
  const { brands = [], authors = [], ...tagLists } = tagsByTopic;

  return (
    <div>
      <MetaTitle title={title} type="article" />
      <MetaDescription description={subtitle} />
      {/* FIXME */}
      <MetaImage url={images.page} />
      <MetaKeywords keywords={keywords} />
      <div className="article-page">
        <div className="article-page-margins">{subtitle}</div>
        <img className="article-page__cover" src={images.page} alt={title} />
      </div>
      <div className="article-page-margins article-page__header">
        {/* TODO: hover corresponding image and title simulteneously */}
        {(!!brands.length || !!authors.length) && (
          <div className="article-page__tags">
            {brands.concat(authors).map(({ topic, slug, content }) => (
              <Link
                key={slug}
                className="article-page__tag-image-link"
                route={ROUTES_NAMES.tag}
                params={{ topic: topic.slug, tag: slug }}
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
      {/* FIXME(@andemerie) */}
      {/* audio.trackId */}
      <AudioPlayer trackId={592430019} />
      {/* video.videoId */}
      <VideoPlayer videoId="eSwyzKaIGcg" />
      <div className="article-page-margins">
        <div className="article-page-content">{fiberyRenderer(text.content)}</div>
        <div className="article-page__share">
          <ShareButtons url={router.asPath} title={title} />
        </div>
        <div className="article-page__other-tags">
          {Object.values(tagLists).map(tagList =>
            tagList.map(tag => (
              <div key={tag.slug} className="article-page__other-tag">
                {getTagLink({ tag })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

Article.propTypes = {
  data: ArticleShape.isRequired,
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Article);
