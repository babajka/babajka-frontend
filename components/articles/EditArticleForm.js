import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ArticleModel } from 'utils/customPropTypes';
import { getLocalizedArticle } from 'utils/getters';
import { selectors } from 'redux/ducks/articles';

import Editor from './Editor';

const mapStateToProps = state => ({
  article: selectors.getCurrent(state),
});

const EditArticleForm = ({ mode, article }) => {
  const localized = getLocalizedArticle(article);
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
  article: ArticleModel,
  mode: PropTypes.oneOf(['edit', 'create']).isRequired,
};

EditArticleForm.defaultProps = {
  article: null,
};

export default connect(mapStateToProps)(EditArticleForm);
