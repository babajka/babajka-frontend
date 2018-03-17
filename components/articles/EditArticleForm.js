import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getLocalized } from 'utils/getters';
import { selectors } from 'redux/ducks/articles';

import Editor from './Editor';

const mapStateToProps = state => ({
  article: selectors.getCurrent(state),
});

const EditArticleForm = ({ mode, article }) => {
  const localized = getLocalized(article, 'be');
  const content = localized ? localized.text : '';
  return (
    <div>
      {mode} article
      <div>
        <Editor content={content} />
      </div>
    </div>
  );
};

EditArticleForm.propTypes = {
  // TODO: replace with Article model
  // eslint-disable-next-line
  article: PropTypes.object,
  mode: PropTypes.oneOf(['edit', 'create']).isRequired,
};

export default connect(mapStateToProps)(EditArticleForm);
