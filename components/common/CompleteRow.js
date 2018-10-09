import React from 'react';
import PropTypes from 'prop-types';

const CompleteRow = ({ className, children, currentSize, requiredSize }) => (
  <>
    {children}
    {Array.from(
      { length: Math.max(0, requiredSize - (currentSize || children.length)) },
      (_, i) => (
        <div key={`empty-div-${i}`} className={className} />
      )
    )}
  </>
);

CompleteRow.propTypes = {
  className: PropTypes.string.isRequired,
  currentSize: PropTypes.number,
  requiredSize: PropTypes.number.isRequired,
  children: PropTypes.node,
};

CompleteRow.defaultProps = {
  children: [],
  currentSize: null,
};

export default CompleteRow;
