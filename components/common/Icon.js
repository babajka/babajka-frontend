import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, size, ...props }) => <i className={`fa fa-${name} fa-${size}`} {...props} />;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Icon.defaultProps = { size: 'lg' };

export default Icon;
