import PropTypes from 'prop-types';

const articlePropTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  author: PropTypes.string,
  className: PropTypes.string,
  imagePath: PropTypes.string.isRequired,
  imageClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default articlePropTypes;
