import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Form, Text as TextField } from 'react-form';
import get from 'lodash/get';
import noop from 'lodash/noop';
import omit from 'lodash/omit';

import { actions, selectors } from 'redux/ducks/articles';
import { BrandsArray, LangType } from 'utils/customPropTypes';
import { required, isUrl } from 'utils/validators';
import { Router, ROUTES_NAMES } from 'routes';
import { LANGS } from 'constants';

import Text from 'components/common/Text';
import Select from 'components/common/Select';
import Clickable from 'components/common/Clickable';
import EditLocaleForm, { localesFalidator } from './EditLocaleForm';

const mapStateToProps = state => ({
  article: selectors.getRawCurrent(state),
  brands: selectors.getBrands(state),
  pending: selectors.isPending(state),
  error: selectors.isError(state),
});

const mapDispatchToProps = {
  fetchBrands: actions.fetchBrands,
  createArticle: actions.create,
  updateArticle: actions.update,
};

const initArticle = {
  type: 'text',
  brandSlug: 'wir',
  locales: {},
};

const initLocale = {
  text: 'type something...',
};

const getFields = ({ brands }) => [
  {
    id: 'type',
    options: [
      {
        id: 'text',
        label: <Text id="common.text" />,
      },
      {
        id: 'video',
        label: <Text id="common.video" />,
      },
    ],
    size: 'xs',
  },
  {
    id: 'author',
  },
  {
    id: 'brandSlug',
    options: brands && brands.map(({ slug: id, name: label }) => ({ id, label })),
    size: 'l',
  },
  {
    id: 'collectionSlug',
  },
  {
    id: 'publicationDate',
  },
  {
    id: 'imagePreviewUrl',
    type: 'input',
    help: 'image-preview-help',
    validator: ({ imagePreviewUrl }) => required(imagePreviewUrl) || isUrl(imagePreviewUrl),
  },
  {
    id: 'imageFolderUrl',
    type: 'input',
    help: 'image-folder-help',
    validator: ({ imageFolderUrl = '' }) => isUrl(imageFolderUrl),
  },
  {
    id: 'videoUrl',
    type: 'input',
    help: 'video-help',
    hide: ({ type }) => type !== 'video',
    validator: ({ type, videoUrl }) => type === 'video' && (required(videoUrl) || isUrl(videoUrl)),
  },
];

class EditArticleForm extends Component {
  static propTypes = {
    lang: LangType.isRequired,
    articleLocale: LangType,
    article: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    brands: BrandsArray,
    pending: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(['edit', 'create']).isRequired,
    fetchBrands: PropTypes.func.isRequired,
    createArticle: PropTypes.func.isRequired,
    updateArticle: PropTypes.func.isRequired,
    error: PropTypes.any, // eslint-disable-line
  };

  static defaultProps = {
    articleLocale: null,
    article: initArticle,
    brands: null,
  };

  componentWillMount() {
    const { articleLocale } = this.props;
    this.setState({ currentLocale: articleLocale });
  }

  componentDidMount() {
    const { fetchBrands } = this.props;
    fetchBrands();
  }

  handleSubmit = form => {
    const { article, mode, lang, createArticle, updateArticle } = this.props;
    if (mode === 'create') {
      return createArticle(form).then(({ value: { _id: slug } }) => {
        Router.replaceRoute(ROUTES_NAMES.article, { slug, mode: 'edit', lang });
      });
    }
    const { _id } = article;
    // FIXME(drapegnik):
    return updateArticle({ ...form, _id, brand: null });
  };

  render() {
    const { mode, article, brands, pending, error } = this.props;
    const { currentLocale } = this.state;
    const { brand, collection } = article || {};
    const formattedArticle = {
      ...omit(article, ['collection', 'brand']),
      brandSlug: brand && brand.slug,
      collectionSlug: collection && collection.slug,
    };
    const defaultValues = mode === 'create' ? initArticle : formattedArticle;
    const fields = getFields({ brands });
    const errorValidator = values => {
      const errors = {};
      fields.forEach(({ id, validator }) => {
        if (validator) {
          errors[id] = validator(values);
        }
      });
      errors.locales = localesFalidator(values.locales);
      return errors;
    };

    return (
      <div className="article-page-edit">
        <div className="title">
          <Text id="article.editor" />
        </div>
        <Form
          onSubmit={this.handleSubmit}
          onSubmitFailure={noop}
          defaultValues={defaultValues}
          validateError={errorValidator}
        >
          {formApi => {
            const { locales } = formApi.values;
            const keys = Object.keys(locales);
            const availableLocales = LANGS.filter(({ id }) => !keys.includes(id));
            const addedLocales = LANGS.filter(({ id }) => keys.includes(id));
            const localeTouched = l => get(formApi.touched, `locales.${l}`);
            const localeHasError = l => localeTouched(l) && get(formApi.errors, `locales.${l}`);

            return (
              <form onSubmit={formApi.submitForm}>
                <div className="common-data">
                  <div className="common-data-title">
                    <Text id="article.common" />
                  </div>
                  <div className="inputs">
                    {fields.map(({ id, options, type, help, hide, size }) => {
                      if (hide && hide(formApi.values)) {
                        return null;
                      }
                      const fieldError = formApi.errors[id];
                      const touched = !!formApi.touched[id];
                      const hasError = !pending && touched && !!fieldError;

                      return (
                        <div key={id} className={cn('field', { 'long-input': type === 'input' })}>
                          {type === 'input' && (
                            <Text
                              id={`article.${help}`}
                              render={placeholder => (
                                <TextField
                                  id={id}
                                  field={id}
                                  className={cn('input', { 'is-danger': hasError })}
                                  placeholder={placeholder}
                                />
                              )}
                            />
                          )}
                          {hasError && (
                            <p className="help is-danger">
                              <Text id={fieldError} />
                            </p>
                          )}
                          <p className="help">
                            <Text id={`article.${id}`} />
                          </p>
                          {options && (
                            <Select
                              size={size}
                              value={formApi.values[id]}
                              options={options}
                              onChange={formApi.setValue.bind(null, id)}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="localized-data">
                  <div className="localized-data-title">
                    <Text id="article.localize" />
                  </div>
                  {!!availableLocales.length && (
                    <Text
                      id="article.add"
                      render={placeholder => (
                        <Select
                          dropdown
                          className="add-locale-button"
                          placeholder={placeholder}
                          options={availableLocales}
                          onChange={locale => {
                            formApi.setValue('locales', {
                              ...locales,
                              [locale]: { ...initLocale, locale },
                            });
                            this.setState({ currentLocale: locale });
                          }}
                        />
                      )}
                    />
                  )}
                  <div className="tabs is-centered">
                    <ul>
                      {addedLocales.map(({ id, label }) => (
                        <li
                          key={id}
                          className={cn({
                            'is-active': id === currentLocale,
                          })}
                        >
                          <Clickable tag="a" onClick={() => this.setState({ currentLocale: id })}>
                            <span
                              className={cn({
                                'has-text-danger': id !== currentLocale && localeHasError(id),
                              })}
                            >
                              {id.toUpperCase()} - {label}
                            </span>
                          </Clickable>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {currentLocale && (
                    <EditLocaleForm
                      article={article}
                      prefix={`locales.${currentLocale}`}
                      formApi={formApi}
                      pending={pending}
                      error={error}
                      onRemove={() => {}}
                    />
                  )}
                </div>
              </form>
            );
          }}
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleForm);
