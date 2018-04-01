import PropTypes from 'prop-types';

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
  bio: PropTypes.string,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  active: PropTypes.bool.isRequired,
};

export const AuthorShape = PropTypes.shape(AuthorModel);

export const ArticleModel = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  author: AuthorShape,
  className: PropTypes.string,
  imageUrl: PropTypes.string, // TODO: need to be required
  imageClassName: PropTypes.string,
  brand: BrandShape,
  articleId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export const ArticleShape = PropTypes.shape(ArticleModel);

export const ArticlesArray = PropTypes.arrayOf(ArticleShape);

export const DiaryModel = {
  text: PropTypes.string.isRequired,
  colloquialDate: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  getNextDiary: PropTypes.func,
  getPrevDiary: PropTypes.func,
};

export const DiaryShape = PropTypes.shape(DiaryModel);
