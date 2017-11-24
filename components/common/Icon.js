import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, size }) => <i className={`fa fa-${name} fa-${size}`} />;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Icon.defaultProps = { size: 'lg' };

export default Icon;
