import PropTypes from 'prop-types';

const brandPropTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const articlePropTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  author: PropTypes.string,
  className: PropTypes.string,
  imagePath: PropTypes.string, // TODO: need to be required
  imageClassName: PropTypes.string,
  onClick: PropTypes.func, // TODO: need to be required
  brand: PropTypes.shape(brandPropTypes),
  articleId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const diaryPropTypes = {
  text: PropTypes.string.isRequired,
  colloquialDate: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  getNextDiary: PropTypes.func.isRequired,
  getPrevDiary: PropTypes.func.isRequired,
};

export { diaryPropTypes, articlePropTypes };
