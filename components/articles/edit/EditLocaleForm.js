import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Text, TextArea } from 'react-form';

import { actions, selectors } from 'redux/ducks/articles';
import { ArticleShape } from 'utils/customPropTypes';
import { getLocalizedArticle } from 'utils/getters';
import { redirectToArticle } from 'constants/routing';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
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
          <form className="inputs" onSubmit={formApi.submitForm}>
            <div className="basics">
              <Text
                id="title"
                field="title"
                className="long-input input spaced"
                placeholder="Назва артыкула"
              />
              <div className="long-input field spaced">
                <Text
                  id="slug"
                  field="slug"
                  className="input"
                  placeholder="Напрыклад: bielaruskaje-kino"
                />
                <p className="help">Slug артыкула: вызначае адрас артыкула ў інтэрнэце</p>
              </div>
              <div className="field spaced">
                <div className="control">
                  <TextArea
                    id="subtitle"
                    field="subtitle"
                    className="textarea is-small"
                    cols="50"
                    rows="2"
                    type="text"
                    placeholder="Кароткае апісанне артыкула (напрыклад, для preview на галоўнай старонцы)."
                  />
                </div>
              </div>
            </div>
            <div className="field editor">
              <Editor
                content={formApi.values.text}
                onChange={body => formApi.setValue('text', body)}
              />
            </div>
            <div className="action-buttons">
              <Button className="remove-button button">
                <span className="icon is-small">
                  <Icon name="remove" />
                </span>
                <span>Выдаліць лакалізацыю</span>
              </Button>
              <Button className="save-button button" type="submit" onClick={formApi.submitForm}>
                Захаваць для публікацыі
              </Button>
            </div>
          </form>
        )}
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLocaleForm);
