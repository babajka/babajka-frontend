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
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  createdBy: ShortUserShape.isRequired,
  updatedBy: ShortUserShape.isRequired,
});

export const CollectionModel = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export const CollectionShape = PropTypes.shape(CollectionModel);

export const CollectionsArray = PropTypes.arrayOf(CollectionShape);

export const LangType = PropTypes.oneOf(VALID_LOCALES);

export const TopicShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  slug: PropTypes.oneOf(TOPICS).isRequired,
});

// export const TopicsArray = PropTypes.arrayOf(TopicShape);
export const TopicsById = PropTypes.objectOf(TopicShape);

export const TagShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  topic: TopicShape.isRequired,
  content: PropTypes.object.isRequired,
});

export const TagsArray = PropTypes.arrayOf(TagShape);
export const TagsById = PropTypes.objectOf(TagShape);

export const ArticleCoversShape = PropTypes.shape({
  page: PropTypes.string.isRequired,
  horizontal: PropTypes.string.isRequired,
  vertical: PropTypes.string.isRequired,
});

export const ArticleVideoShape = PropTypes.shape({
  platform: PropTypes.string,
  videoId: PropTypes.string,
  videoUrl: PropTypes.string,
});

export const ArticleType = PropTypes.oneOf(ARTICLE_TYPES);

export const ArticleModel = {
  active: PropTypes.bool.isRequired,
  articleId: PropTypes.string.isRequired,
  collection: CollectionShape,
  content: PropTypes.object.isRequired,
  locale: LangType,
  publishAt: PropTypes.string,
  published: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: ArticleType.isRequired,
  covers: ArticleCoversShape.isRequired,
  video: ArticleVideoShape,
  metadata: MetadataShape.isRequired,
  keywords: PropTypes.string.isRequired,
  tags: TagsArray.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  bgColor: PropTypes.string.isRequired,
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

const ROLES = ['author', 'regular'];

// TODO: sync
export const UserShape = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(ROLES).isRequired,
  active: PropTypes.bool.isRequired,
  bio: PropTypes.string,
  imageUrl: PropTypes.string,
  permissions: PermissionsShape.isRequired,
});
