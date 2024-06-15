import PropTypes from 'prop-types';

import { TOPICS, VALID_LOCALES } from 'constants';

export const IdsArray = PropTypes.arrayOf(PropTypes.string);

const ShortUserShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

const MetadataShape = PropTypes.shape({
  createdAt: PropTypes.number.isRequired,
  updatedAt: PropTypes.number.isRequired,
  createdBy: ShortUserShape,
  updatedBy: ShortUserShape,
});

const CollectionModel = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  podcastCover: PropTypes.string,
};

export const CollectionShape = PropTypes.shape(CollectionModel);

export const LangType = PropTypes.oneOf(VALID_LOCALES);

export const TopicSlug = PropTypes.oneOf(TOPICS);
const TopicShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  slug: TopicSlug.isRequired,
});

// export const TopicsArray = PropTypes.arrayOf(TopicShape);
export const TopicsById = PropTypes.objectOf(TopicShape);

export const TagShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  topicSlug: TopicSlug.isRequired,
  content: PropTypes.object.isRequired,
});

export const TagsArray = PropTypes.arrayOf(TagShape);
export const TagsById = PropTypes.objectOf(TagShape);

export const ArticleCoversShape = PropTypes.shape({
  page: PropTypes.string,
  horizontal: PropTypes.string.isRequired,
  vertical: PropTypes.string.isRequired,
});

export const ThemeType = PropTypes.oneOf(['light', 'dark']);

const ArticleMediaShape = PropTypes.shape({
  platform: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
});

const ArticleAudioShape = PropTypes.shape({
  id: PropTypes.string, // For backward-compatibility; stands for yandexmusic episode ID.
  episodeIds: PropTypes.shape({
    applepodcasts: PropTypes.string,
    spotifypodcasts: PropTypes.string,
    yandexmusic: PropTypes.string,
  }),
});

export const ArticleType = PropTypes.oneOf(['text', 'video', 'audio']);

const ArticlePreviewModel = {
  active: PropTypes.bool.isRequired,
  articleId: PropTypes.string.isRequired,
  collection: CollectionShape,
  locale: LangType,
  publishAt: PropTypes.string,
  published: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  type: ArticleType.isRequired,
  images: ArticleCoversShape.isRequired,
  video: ArticleMediaShape,
  audio: ArticleAudioShape,
  metadata: MetadataShape.isRequired,
  tagsByTopic: PropTypes.objectOf(TagsArray).isRequired,
  theme: ThemeType.isRequired,
  color: PropTypes.string.isRequired,
};

const ArticlePreviewShape = PropTypes.shape(ArticlePreviewModel);
export const ArticlePreviewArray = PropTypes.arrayOf(ArticlePreviewShape);
export const ArticlePreviewsById = PropTypes.objectOf(ArticlePreviewShape);

const ArticleModel = {
  ...ArticlePreviewModel,
  text: PropTypes.object.isRequired,
  keywords: PropTypes.string.isRequired,
  metrics: PropTypes.number,
  suggestedArticles: PropTypes.shape({
    blocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    data: PropTypes.shape({
      articles: ArticlePreviewsById,
      tags: TagsById,
      topics: TopicsById,
      latestArticles: ArticlePreviewArray,
    }).isRequired,
  }),
};

export const ArticleShape = PropTypes.shape(ArticleModel);
export const ArticlesArray = PropTypes.arrayOf(ArticleShape);

// const DiaryShape = PropTypes.shape({
//   slug: PropTypes.string.isRequired,
//   text: PropTypes.object,
//   date: PropTypes.number.isRequired,
//   author: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     diaryImage: PropTypes.string,
//   }),
// });

export const IconPackShape = PropTypes.oneOf(['s', 'r', 'b']);
