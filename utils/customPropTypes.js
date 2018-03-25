import PropTypes from 'prop-types';

export const BrandModel = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const ArticleModel = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  author: PropTypes.string,
  className: PropTypes.string,
  imagePath: PropTypes.string, // TODO: need to be required
  imageClassName: PropTypes.string,
  onClick: PropTypes.func, // TODO: need to be required
  brand: PropTypes.shape(BrandModel),
  articleId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export const DiaryModel = {
  text: PropTypes.string.isRequired,
  colloquialDate: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  getNextDiary: PropTypes.func,
  getPrevDiary: PropTypes.func,
};
