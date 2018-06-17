import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Form, Text as TextField } from 'react-form';
import get from 'lodash/get';
import noop from 'lodash/noop';
import omit from 'lodash/omit';

import { actions, selectors } from 'redux/ducks/articles';
import { AuthorsArray, BrandsArray, CollectionsArray, LangType } from 'utils/customPropTypes';
import { required, isUrl } from 'utils/validators';
import { Router, ROUTES_NAMES } from 'routes';
import { LANGS } from 'constants';

import Text, { localize } from 'components/common/Text';
import Select from 'components/common/Select';
import Clickable from 'components/common/Clickable';
import EditLocaleForm, { localesValidator } from './EditLocaleForm';
import Author from './Author';

const mapStateToProps = state => ({
  article: selectors.getRawCurrent(state),
  brands: selectors.getBrands(state),
  authors: selectors.getAuthors(state),
  collections: selectors.getColletions(state),
  pending: selectors.isPending(state),
  serverErrors: selectors.getErrors(state) || {},
});

const mapDispatchToProps = {
  fetchBrands: actions.fetchBrands,
  fetchAuthors: actions.fetchAuthors,
  fetchCollections: actions.fetchCollections,
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

const getFields = ({ authors, collections, lang }) => [
  {
    id: 'type',
    type: 'select',
    controlProps: {
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
  },
  {
    id: 'authorEmail',
    type: 'select',
    controlProps: {
      // TODO: mb add `idField` to Select
      options: authors && authors.map(({ email: id, ...rest }) => ({ id, ...rest })),
      renderOption: ({ displayName, imageUrl }) => (
        <Author name={displayName} imageUrl={imageUrl} />
      ),
      placeholder: localize('article.author-not-selected', lang),
      clerable: true,
    },
  },
  // {
  //   id: 'brandSlug',
  //   type: 'select',
  //   controlProps: {
  //     options: brands && brands.map(({ slug: id, name: label }) => ({ id, label })),
  //     size: 'l',
  //   },
  // },
  {
    id: 'collectionSlug',
    type: 'select',
    controlProps: {
      options: collections && collections.map(({ slug: id, name: label }) => ({ id, label })),
      placeholder: localize('article.not-in-collection', lang),
      clerable: true,
    },
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
    authors: AuthorsArray,
    collections: CollectionsArray,
    pending: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(['edit', 'create']).isRequired,
    fetchBrands: PropTypes.func.isRequired,
    fetchAuthors: PropTypes.func.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    createArticle: PropTypes.func.isRequired,
    updateArticle: PropTypes.func.isRequired,
    serverErrors: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    articleLocale: null,
    article: initArticle,
    brands: null,
    authors: null,
    collections: null,
  };

  componentWillMount() {
    const { articleLocale } = this.props;
    this.setState({ currentLocale: articleLocale });
  }

  componentDidMount() {
    const { fetchBrands, fetchAuthors, fetchCollections } = this.props;
    fetchBrands();
    fetchAuthors();
    fetchCollections();
  }

  handleSubmit = form => {
    const { article, mode, lang, createArticle, updateArticle } = this.props;
    if (mode === 'create') {
      return createArticle(form).then(({ value: { _id: slug } }) => {
        // TODO: check that redirect is occurs
        Router.replaceRoute(ROUTES_NAMES.editArticle, { slug, lang });
      });
    }
    const { _id } = article;
    return updateArticle({ ...form, _id });
  };

  render() {
    const { mode, article, lang, authors, brands, collections, pending, serverErrors } = this.props;
    const { currentLocale } = this.state;
    const { brand, collection, _id: slug } = article || {};
    const formattedArticle = {
      ...omit(article, ['collection', 'brand']),
      brandSlug: brand && brand.slug,
      collectionSlug: collection && collection.slug,
    };
    const defaultValues = mode === 'create' ? initArticle : formattedArticle;
    const fields = getFields({ brands, authors, collections, lang });
    const errorValidator = values => {
      const errors = {};
      fields.forEach(({ id, validator }) => {
        if (validator) {
          errors[id] = validator(values);
        }
      });
      errors.locales = localesValidator(values.locales);
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
            const keys = Object.keys(locales).filter(key => locales[key]);
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
                    {fields.map(({ id, type, help, hide, controlProps }) => {
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
                          {type === 'select' &&
                            controlProps.options && (
                              <Select
                                value={formApi.values[id]}
                                onChange={formApi.setValue.bind(null, id)}
                                {...controlProps}
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
                      errors={serverErrors}
                      onRemove={() => {
                        const nextLocales = omit(locales, currentLocale);
                        const [nextLocale] = Object.keys(nextLocales);
                        formApi.setValue('locales', nextLocales);
                        this.setState({ currentLocale: nextLocale });
                        Router.replaceRoute(ROUTES_NAMES.editArticle, {
                          slug,
                          lang,
                          articleLocale: nextLocale,
                          mode: 'edit',
                        });
                      }}
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
