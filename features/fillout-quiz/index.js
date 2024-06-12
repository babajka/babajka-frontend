import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './quiz.module.scss';

function loadSdk(id) {
  let script = document.getElementById(id);
  if (script) {
    script.remove();
  }

  script = document.createElement('script');
  script.id = id;
  script.src = 'https://server.fillout.com/embed/v1/';
  document.body.appendChild(script);
}

const FilloutQuiz = ({ id }) => {
  useLayoutEffect(() => {
    loadSdk('fillout-sdk');
  }, []);
  return (
    <div
      className={styles.quiz}
      data-fillout-id={id}
      data-fillout-embed-type="standard"
      data-fillout-inherit-parameters
      data-fillout-dynamic-resize
    />
  );
};

FilloutQuiz.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FilloutQuiz;
