import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Icon = ({ className, name, pack, size, ...props }) => (
  <i
    className={cn(className, `fa${pack} fa-${name}`, size && `fa-${size}`)}
    aria-hidden="true"
    {...props}
  />
);

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  pack: PropTypes.oneOf(['s', 'r', 'b']),
};

Icon.defaultProps = {
  className: '',
  size: null,
  pack: 's',
};

export default Icon;
