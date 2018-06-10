import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import redraft from 'redraft';

import renderers from './renderers';

const Renderer = ({ content }) => {
  if (!content) {
    return null;
  }
  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="/static/Dante2/DanteStyles.css" />
      </Head>
      <div className="postArticle">
        <div className="postContent">
          <div className="postField postField--body">
            <section className="section--first section--last">
              <div className="section-content container">
                <div className="section-inner layoutSingleColumn">
                  <div className="DraftEditor-root">
                    <div className="DraftEditor-editorContainer">{redraft(content, renderers)}</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Renderer.propTypes = {
  content: PropTypes.shape({}),
};

Renderer.defaultProps = {
  content: null,
};

export default Renderer;
