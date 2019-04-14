import PropTypes from 'prop-types';

import { VALID_LOCALES } from 'components/common/LocaleContext';
import { TOPICS } from 'constants/home';

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

export const TagShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  topic: TopicShape.isRequired,
  content: PropTypes.object.isRequired,
});

export const ArticleModel = {
  active: PropTypes.bool.isRequired,
  articleId: PropTypes.string.isRequired,
  collection: CollectionShape,
  content: PropTypes.object.isRequired,
  locale: LangType,
  publishAt: PropTypes.string,
  published: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  images: PropTypes.shape({
    // FIXME
  }),
  video: PropTypes.shape({
    platform: PropTypes.string,
    videoId: PropTypes.string,
    videoUrl: PropTypes.string,
  }),
  metadata: MetadataShape.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(TagShape).isRequired,
};

export const ArticleShape = PropTypes.shape(ArticleModel);

export const ArticlesArray = PropTypes.arrayOf(ArticleShape);

export const PermissionsShape = PropTypes.shape({
  canCreateArticle: PropTypes.bool.isRequired,
  canManageArticles: PropTypes.bool.isRequired,
  canManageUsers: PropTypes.bool.isRequired,
});

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
