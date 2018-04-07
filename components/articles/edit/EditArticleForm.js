import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Form, Text } from 'react-form';

import { actions, selectors } from 'redux/ducks/articles';
import { ArticleShape, BrandsArray, LangType } from 'utils/customPropTypes';
import { Router, ROUTES_NAMES } from 'routes';
import { LANGS } from 'constants';

import Select from 'components/common/Select';
import Clickable from 'components/common/Clickable';
import EditLocaleForm from './EditLocaleForm';

const mapStateToProps = state => ({
  article: selectors.getRawCurrent(state),
  brands: selectors.getBrands(state),
});

const mapDispatchToProps = {
  fetchBrands: actions.fetchBrands,
  createArticle: actions.create,
  updateArticle: actions.update,
};

const initArticle = {
  type: 'text',
  brand: 'wir',
  locales: {},
};

const initLocale = {
  text: 'type something...',
};

class EditArticleForm extends Component {
  static propTypes = {
    lang: LangType.isRequired,
    articleLocale: LangType,
    // TODO: fix prop tupe
    article: ArticleShape,
    brands: BrandsArray,
    mode: PropTypes.oneOf(['edit', 'create']).isRequired,
    fetchBrands: PropTypes.func.isRequired,
    createArticle: PropTypes.func.isRequired,
    updateArticle: PropTypes.func.isRequired,
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
    const { mode, lang, createArticle, updateArticle } = this.props;
    const action = mode === 'create' ? createArticle : updateArticle;
    action(form).then(({ id }) =>
      Router.replace(ROUTES_NAMES.article, { slug: id, mode: 'edit', lang })
    );
  };

  render() {
    const { mode, article, brands } = this.props;
    const { currentLocale } = this.state;
    const defaultValues =
      mode === 'create'
        ? initArticle
        : {
            ...article,
            brand: article.brand.slug,
          };

    const FIELDS = [
      {
        id: 'type',
        label: 'Тып артыкула',
        options: [
          {
            id: 'text',
            label: 'Тэкст',
          },
          {
            id: 'video',
            label: 'Відэа',
          },
        ],
      },
      {
        id: 'author',
        label: 'Аўтар',
      },
      {
        id: 'brand',
        label: 'Пад якім брэндам выходзіць артыкул',
        options: brands && brands.map(({ slug: id, name: label }) => ({ id, label })),
      },
      {
        id: 'collection',
        label: 'Калекцыя / цыкл',
      },
      {
        id: 'publicationDate',
        label: 'Час публікацыі артыкула',
      },
      {
        id: 'imageUrl',
        type: 'input',
        label:
          'URL фатаздымка - вокладкі артыкула. Фатаздымак павінен быць у добрай якасці, не парушаць аўтарскіх правоў і быць размешчаным у кантралюемым сховішчы',
        placeholder: 'Напрыклад: https://photos.google.com/my-best-photo.jpg',
      },
      {
        id: 'videoUrl',
        type: 'input',
        label: 'Спасылка на відэа, размешчанае на нашым канале на YouTube',
        placeholder: 'Напрыклад: https://www.youtube.com/watch?v=Eve34hxXo5M',
        hide: ({ type }) => type !== 'video',
      },
    ];

    return (
      <div className="article-page-edit">
        <div className="title">Рэдактар артыкулаў</div>
        <Form onSubmit={this.handleSubmit} defaultValues={defaultValues}>
          {formApi => {
            const { locales } = formApi.values;
            const keys = Object.keys(locales);
            const availableLocales = LANGS.filter(({ id }) => !keys.includes(id));
            const addedLocales = LANGS.filter(({ id }) => keys.includes(id));

            return (
              <form onSubmit={formApi.submitForm}>
                <div className="common-data">
                  <div className="common-data-title">Рэдагаваць асноўныя звесткі</div>
                  <div className="inputs">
                    {FIELDS.map(({ id, label, options, type, placeholder, hide }) => {
                      if (hide && hide(formApi.values)) {
                        return null;
                      }
                      return (
                        <div
                          key={id}
                          className={classNames('field', { 'long-input': type === 'input' })}
                        >
                          {type === 'input' && (
                            <Text id={id} field={id} className="input" placeholder={placeholder} />
                          )}
                          <p className="help">{label}</p>
                          {options && (
                            <Select
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
                  <div className="localized-data-title">Лакалізаваць артыкул</div>
                  {!!availableLocales.length && (
                    <Select
                      dropdown
                      className="add-locale-button"
                      placeholder="Дадаць лакалізацыю"
                      options={availableLocales}
                      onChange={l => {
                        formApi.setValue('locales', {
                          ...locales,
                          [l]: { ...initLocale },
                        });
                        this.setState({ currentLocale: l });
                      }}
                    />
                  )}
                  <div className="tabs is-centered">
                    <ul>
                      {addedLocales.map(({ id, label }) => (
                        <li key={id} className={classNames({ 'is-active': id === currentLocale })}>
                          <Clickable tag="a" onClick={() => this.setState({ currentLocale: id })}>
                            {id.toUpperCase()} - {label}
                          </Clickable>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {currentLocale && (
                    <EditLocaleForm prefix={`locales.${currentLocale}`} formApi={formApi} />
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
