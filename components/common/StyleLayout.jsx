import React from 'react';
import PropTypes from 'prop-types';

import 'babajka-markup/dist/bundle.min.css';
import 'babajka-markup/dist/assets.min.css';

const StyleLayout = ({ children }) => (<div>{children}</div>);

StyleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StyleLayout;
