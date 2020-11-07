import PropTypes from 'prop-types';

import { TOPICS } from 'constants';
import { VALID_LOCALES } from 'components/common/LocaleContext';
import { ARTICLE_TYPES } from 'constants/articles';

export const IdsArray = PropTypes.arrayOf(PropTypes.string);

export const ShortUserShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

export const MetadataShape = PropTypes.shape({
  createdAt: PropTypes.number.isRequired,
  updatedAt: PropTypes.number.isRequired,
  createdBy: ShortUserShape,
  updatedBy: ShortUserShape,
});

export const CollectionModel = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  podcastCover: PropTypes.string,
};

export const CollectionShape = PropTypes.shape(CollectionModel);

export const CollectionsArray = PropTypes.arrayOf(CollectionShape);

export const LangType = PropTypes.oneOf(VALID_LOCALES);

export const TopicSlug = PropTypes.oneOf(TOPICS);
export const TopicShape = PropTypes.shape({
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

export const ArticleMediaShape = PropTypes.shape({
  platform: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
});

export const ArticleType = PropTypes.oneOf(ARTICLE_TYPES);

export const ArticlePreviewModel = {
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
  audio: ArticleMediaShape,
  metadata: MetadataShape.isRequired,
  tagsByTopic: PropTypes.objectOf(TagsArray).isRequired,
  theme: ThemeType.isRequired,
  color: PropTypes.string.isRequired,
};

export const ArticlePreviewShape = PropTypes.shape(ArticlePreviewModel);
export const ArticlePreviewArray = PropTypes.arrayOf(ArticlePreviewShape);
export const ArticlePreviewsArrays = PropTypes.arrayOf(ArticlePreviewArray);
export const ArticlePreviewsById = PropTypes.objectOf(ArticlePreviewShape);

export const ArticleModel = {
  ...ArticlePreviewModel,
  text: PropTypes.object.isRequired,
  keywords: PropTypes.string.isRequired,
  metrics: PropTypes.number,
  suggestedArticles: PropTypes.shape({
    count: PropTypes.number.isRequired,
    blocks: ArticlePreviewsArrays.isRequired,
  }),
};

export const ArticleShape = PropTypes.shape(ArticleModel);
export const ArticlesArray = PropTypes.arrayOf(ArticleShape);
export const ArticlesById = PropTypes.objectOf(ArticleShape);

const PermissionsModel = {
  adminAccess: PropTypes.bool.isRequired,
  canCreateArticle: PropTypes.bool.isRequired,
  canManageArticles: PropTypes.bool.isRequired,
  canManageUsers: PropTypes.bool.isRequired,
};

export const PermissionsList = PropTypes.arrayOf(PropTypes.oneOf(Object.keys(PermissionsModel)));

export const PermissionsShape = PropTypes.shape(PermissionsModel);

export const UserShape = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string,
  permissions: PermissionsShape.isRequired,
});

export const DiaryShape = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  text: PropTypes.object,
  date: PropTypes.number.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    diaryImage: PropTypes.string,
  }),
});

export const IconPackShape = PropTypes.oneOf(['s', 'r', 'b']);
