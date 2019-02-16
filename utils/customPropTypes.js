import PropTypes from 'prop-types';

import { LOCALES } from 'constants';

export const BrandModel = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export const BrandShape = PropTypes.shape(BrandModel);

export const BrandsArray = PropTypes.arrayOf(BrandShape);

export const AuthorModel = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export const AuthorShape = PropTypes.shape(AuthorModel);

export const AuthorsArray = PropTypes.arrayOf(AuthorShape);

export const CollectionModel = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export const CollectionShape = PropTypes.shape(CollectionModel);

export const CollectionsArray = PropTypes.arrayOf(CollectionShape);

export const LangType = PropTypes.oneOf(Object.keys(LOCALES));

export const ArticleModel = {
  active: PropTypes.bool.isRequired,
  articleId: PropTypes.string.isRequired,
  author: AuthorShape,
  brand: BrandShape,
  collection: CollectionShape,
  content: PropTypes.shape({}).isRequired,
  createdAt: PropTypes.string.isRequired,
  imageFolderUrl: PropTypes.string,
  imagePreviewUrl: PropTypes.string.isRequired,
  locale: LangType,
  publishAt: PropTypes.string,
  published: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  video: PropTypes.shape({
    platform: PropTypes.string,
    videoId: PropTypes.string,
    videoUrl: PropTypes.string,
  }),
};

export const ArticleShape = PropTypes.shape(ArticleModel);

export const ArticlesArray = PropTypes.arrayOf(ArticleShape);

// TODO: sync
export const PermissionsShape = PropTypes.shape({
  canManageArticles: PropTypes.bool.isRequired,
  canCreateArticle: PropTypes.bool.isRequired,
});
