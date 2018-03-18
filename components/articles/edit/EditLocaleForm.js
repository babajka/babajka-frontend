import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Text, TextArea } from 'react-form';

import text from 'constants/dictionary';
import { actions, selectors } from 'redux/ducks/articles';
import { ArticleShape } from 'utils/customPropTypes';
import { getLocalizedArticle } from 'utils/getters';
import { redirectToArticle } from 'constants/routing';

import Button from 'components/common/Button';
import Editor from './Editor';

const mapStateToProps = state => ({
  article: selectors.getCurrent(state),
});

const mapDispatchToProps = {
  createArticle: actions.create,
  addLocale: actions.addLocale,
};

const initLocale = {
  text: 'type something...',
};

class EditLocaleForm extends Component {
  static propTypes = {
    article: ArticleShape,
    draftArticle: PropTypes.shape({
      type: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
    }).isRequired,
    locale: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['edit', 'create']).isRequired,
    createArticle: PropTypes.func.isRequired,
    addLocale: PropTypes.func.isRequired,
  };

  static defaultProps = {
    article: null,
  };

  handleCreate = () => {
    const { mode, article, createArticle, draftArticle } = this.props;
    if (mode === 'create') {
      return createArticle(draftArticle).then(({ value: { _id } }) => _id);
    }
    return Promise.resolve(article._id);
  };

  handleSubmit = form => {
    const { locale, addLocale } = this.props;
    const data = { locale, ...form };
    this.handleCreate()
      .then(id => addLocale(id, data))
      .then(({ value: { slug } }) => redirectToArticle(slug, 'edit'));
  };

  render() {
    const { article, locale } = this.props;
    const localized = getLocalizedArticle(article, locale);

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <Form onSubmit={this.handleSubmit} defaultValues={{ ...initLocale, ...localized }}>
        {formApi => (
          <form onSubmit={formApi.submitForm}>
            <div>
              <Button
                type="submit"
                // pending={pending}
                onClick={formApi.submitForm}
              >
                {text.addLocale}
              </Button>
            </div>
            <div>
              <Text id="title" field="title" type="text" placeholder="Назва" />
            </div>
            <div>
              <TextArea id="subtitle" field="subtitle" type="text" placeholder="Апісанне" />
            </div>
            <div>
              <Text id="slug" field="slug" type="text" placeholder="Спасылка" />
            </div>
            <Editor
              content={formApi.values.text}
              onChange={body => formApi.setValue('text', body)}
            />
          </form>
        )}
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLocaleForm);
