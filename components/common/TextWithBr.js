import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TextWithBr = ({ text }) => {
  const parts = text.split('<br/>');
  const lastPartIndex = parts.length - 1;
  return parts.map((part, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Fragment key={index}>
      {part}
      {index < lastPartIndex && <br />}
    </Fragment>
  ));
};

TextWithBr.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextWithBr;
