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
  imagePath: PropTypes.string.isRequired,
  imageClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  brand: PropTypes.shape(brandPropTypes),
};

export default articlePropTypes;
