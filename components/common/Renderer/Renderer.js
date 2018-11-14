import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import redraft from 'redraft';

import renderers from './renderers';

const Renderer = ({ content }) => {
  if (!content) {
    return null;
  }
  return (
    <>
      <Head>
        <link key="dante-styles" rel="stylesheet" href="/static/Dante2/DanteStyles.css" />
      </Head>
      <div className="dante2-namespace">
        <div className="postArticle">
          <div className="postContent">
            <div className="postField postField--body">
              <section className="section--first section--last">
                <div className="section-content dante2-container">
                  <div className="section-inner layoutSingleColumn">
                    <div className="DraftEditor-root">
                      <div className="DraftEditor-editorContainer">
                        {redraft(content, renderers)}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Renderer.propTypes = {
  content: PropTypes.shape({}),
};

Renderer.defaultProps = {
  content: null,
};

export default Renderer;
