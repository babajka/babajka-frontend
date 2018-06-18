import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { DanteEditor } from 'Dante2/lib';

import defaultContent from './content.json';
import widgets from './widgets';
import tooltips from './tooltips';
import { defaultWrappers, continuousBlocks, keyCommands, characterConvertMapping } from './config';

const config = {
  el: 'dante2-editor',
  read_only: false,
  spellcheck: false,
  debug: false,
  title_placeholder: 'Title',
  body_placeholder: 'Write your story',
  widgets,
  tooltips,
  default_wrappers: defaultWrappers,
  continuousBlocks,
  key_commands: keyCommands,
  character_convert_mapping: characterConvertMapping,
};

const Editor = ({ content, onChange }) => (
  <>
    <Head>
      <link rel="stylesheet" href="/static/Dante2/DanteStyles.css" />
    </Head>
    <div className="dante2-namespace">
      <DanteEditor config={config} content={content} onChange={onChange} />
    </div>
  </>
);

Editor.propTypes = {
  content: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  content: defaultContent,
};

export default Editor;
