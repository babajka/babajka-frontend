import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'components/common/ui/Spinner';
import styles from './quiz.module.scss';

function loadSdk(d, s, id) {
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  const js = d.createElement(s);
  js.id = id;
  js.src = 'https://embed.ex.co/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}

const ExCoQuiz = ({ id }) => {
  useLayoutEffect(() => {
    loadSdk(document, 'script', 'playbuzz-sdk');
  });
  return (
    <div className="playbuzz" data-id={id} data-show-share="false" data-show-info="false">
      <div className={styles.quiz}>
        <Spinner className={styles.icon} size="2x" />
      </div>
    </div>
  );
};

ExCoQuiz.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ExCoQuiz;
