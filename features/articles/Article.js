import typography from 'styles/typography.module.scss';

import React from 'react';
import flatten from 'lodash/flatten';
import cn from 'classnames';
import bem from 'bem-css-modules';

// import { CROWDFUNDING_CAMPAIGN } from 'constants/misc';
import { SUGGESTED_ARTICLES_ENABLED } from 'constants/misc';

import {
  MetaTitle,
  MetaDescription,
  MetaImage,
  MetaKeywords,
  MetaArticleItems,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';
import AudioButtons from 'components/common/AudioButtons';
import VideoPlayer from 'components/common/VideoPlayer';
import Image from 'components/common/Image';
// import ExternalLink from 'components/common/ExternalLink';
// import Button from 'components/common/Button';
// import MolamolaIcon from 'components/common/ui/MolamolaIcon';
import ShareButtons from 'components/social/ShareButtons';
import ExCoQuiz from 'features/ex-co-quiz';
import TextWithSeparator from 'lib/components/TextWithSeparator';

import { ArticleShape } from 'utils/customPropTypes';
import { getTagLink, getTagImageRenderer, renderTag } from 'utils/features/tags';
import { renderNodeList } from 'utils/ui';
import fiberyRenderer from 'utils/fibery/renderer';
import host from 'utils/host';

import CardBlocksLayout from 'features/layout/card-blocks-layout';
import styles from './article.module.scss';

import CollectionNote from './CollectionNote';

const b = bem(styles);
const COVER_SIZES = [1200, 1000, 770, 640, 360];

const SLUG_TO_QUIZ_ID = {
  bielaruski: 'a8822357-22c3-4090-bfe6-765948466bbe',
  'karatkiewich-test': 'd97b130c-8088-4183-aaf4-a1af49b4e814',
  'kupala-test': '27c28c25-f228-460b-8c69-cdfee9fe08f5',
};

const Article = ({
  data: {
    slug,
    images,
    title,
    subtitle,
    keywords,
    text,
    type,
    video,
    tagsByTopic,
    collection,
    publishAt,
    locale,
    suggestedArticles,
  },
}) => {
  const { brands, authors, ...tagsObject } = tagsByTopic;
  const renderTagImage = getTagImageRenderer({
    className: b('tag-image'),
    inViewport: true,
  });
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
        <div
          className={cn(
            'wir-content-padding',
            styles['article-page-text-content'],
            typography['common-text']
          )}
        >
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
            inViewport
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
        <h1 className={typography['common-title']}>{title}</h1>
      </div>

      <div className="wir-content-padding">
        <div className={styles['article-page-content']}>
          {type === 'audio' && <AudioButtons />}
          {type === 'video' && <VideoPlayer videoId={video.id} />}

          {collection?.articles.length > 1 && <CollectionNote data={collection} locale={locale} />}

          <div className={typography['common-text']}>{fiberyRenderer(text.content)}</div>

          {/* FIXME: hardcode */}
          {SLUG_TO_QUIZ_ID[slug] && (
            <ExCoQuiz key={SLUG_TO_QUIZ_ID[slug]} id={SLUG_TO_QUIZ_ID[slug]} />
          )}

          <div className={b('post-actions')}>
            {/* {CROWDFUNDING_CAMPAIGN.enabled && (
              <ExternalLink href={CROWDFUNDING_CAMPAIGN.options.link}>
                <Button className={b('crowdfunding')} highlighted>
                  <Text id="article.support-crowdfunding" />
                  <span>&nbsp;&nbsp;</span>
                  <MolamolaIcon />
                </Button>
              </ExternalLink>
            )} */}
            <ShareButtons basicText={title} />
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

      {SUGGESTED_ARTICLES_ENABLED && suggestedArticles && (
        <div>
          <CardBlocksLayout blocks={suggestedArticles.blocks} data={suggestedArticles.data} />
        </div>
      )}
    </>
  );
};

Article.propTypes = {
  data: ArticleShape.isRequired,
};

export default Article;
