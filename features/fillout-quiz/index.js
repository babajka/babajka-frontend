import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './quiz.module.scss';

function loadSdk(d, s, id) {
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    window.Fillout.render();
    return;
  }
  const js = d.createElement(s);
  js.id = id;
  js.src = 'https://server.fillout.com/embed/v1/';
  fjs.parentNode.insertBefore(js, fjs);
}

const FilloutQuiz = ({ id }) => {
  useLayoutEffect(() => {
    loadSdk(document, 'script', 'fillout-sdk');
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
