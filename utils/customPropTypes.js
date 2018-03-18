import PropTypes from 'prop-types';

export const BrandModel = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export const ArticleModel = PropTypes.shape({
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  author: PropTypes.string,
  className: PropTypes.string,
  imagePath: PropTypes.string, // TODO: need to be required
  imageClassName: PropTypes.string,
  brand: PropTypes.shape(BrandModel),
  articleId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

export const ArticlesModel = PropTypes.arrayOf(PropTypes.shape(ArticleModel));
