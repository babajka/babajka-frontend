import React, { Fragment } from 'react';
import Head from 'next/head';
import { DanteEditor } from 'Dante2/lib';

// import defaultContent from './content.json';
import widgets from './widgets';
import tooltips from './tooltips';
import {
  xhr,
  dataStorage,
  defaultWrappers,
  continuousBlocks,
  keyCommands,
  characterConvertMapping,
} from './config';

const config = {
  el: 'dante2-editor',
  read_only: false,
  spellcheck: false,
  debug: false,
  title_placeholder: 'Title',
  body_placeholder: 'Write your story',

  xhr,
  data_storage: dataStorage,

  widgets,
  tooltips,
  default_wrappers: defaultWrappers,
  continuousBlocks,
  key_commands: keyCommands,
  character_convert_mapping: characterConvertMapping,
};

export default ({ content }) => (
  <Fragment>
    <Head>
      <link rel="stylesheet" href="/static/Dante2/DanteStyles.css" />
    </Head>
    <DanteEditor config={config} content={content} />
  </Fragment>
);
