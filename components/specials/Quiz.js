import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';

import Icon from 'components/common/ui/Icon';
import styles from './index.module.scss';

const b = bem(styles);

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

const Quiz = ({ id }) => {
  useLayoutEffect(() => {
    loadSdk(document, 'script', 'playbuzz-sdk');
  });
  return (
    <div className="playbuzz" data-id={id} data-show-share="false" data-show-info="false">
      <div className={b()}>
        <Icon className={b('icon', { loading: true })} name="circle-notch" size="2x" />
      </div>
    </div>
  );
};

Quiz.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Quiz;
