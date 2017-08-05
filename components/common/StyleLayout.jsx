import React from 'react';
import PropTypes from 'prop-types';

import 'babajka-markup/dist/styles/bundle.min.css';
import 'babajka-markup/dist/styles/assets.min.css';

const StyleLayout = ({ children }) => (<div>{children}</div>);

StyleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StyleLayout;
