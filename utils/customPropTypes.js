import PropTypes from 'prop-types';

import { LOCALES } from 'constants';

export const PaginationModel = {
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export const PaginationShape = PropTypes.shape(PaginationModel);

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

export const ArticleModel = {
  articleId: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.shape({}).isRequired,
  imagePreviewUrl: PropTypes.string.isRequired,
  imageFolderUrl: PropTypes.string,
  type: PropTypes.string.isRequired,
  author: AuthorShape,
  brand: BrandShape,
  publishAt: PropTypes.string,
  published: PropTypes.bool.isRequired,
};

export const ArticleShape = PropTypes.shape(ArticleModel);

export const ArticlesArray = PropTypes.arrayOf(ArticleShape);

export const LangType = PropTypes.oneOf(Object.keys(LOCALES));
