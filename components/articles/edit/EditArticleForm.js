import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Form, Text } from 'react-form';

import { ArticleShape, BrandsArray } from 'utils/customPropTypes';
import { actions, selectors } from 'redux/ducks/articles';
import { LANGS } from 'constants';

import Select from 'components/common/Select';
import Clickable from 'components/common/Clickable';
import LocaleContext from 'components/common/LocaleContext';
import EditLocaleForm from './EditLocaleForm';

const mapStateToProps = state => ({
  article: selectors.getCurrent(state),
  brands: selectors.getBrands(state),
});

const mapDispatchToProps = {
  fetchBrands: actions.fetchBrands,
};

const initArticle = {
  type: 'text',
  brand: 'wir',
};

class EditArticleForm extends Component {
  static propTypes = {
    article: ArticleShape,
    brands: BrandsArray,
    mode: PropTypes.oneOf(['edit', 'create']).isRequired,
    fetchBrands: PropTypes.func.isRequired,
  };

  static defaultProps = {
    article: initArticle,
    brands: null,
  };

  state = {
    draftArticle: initArticle,
    locales: {},
    currentLocale: null,
  };

  componentDidMount() {
    const { fetchBrands } = this.props;
    fetchBrands();
  }

  handleSubmit = draftArticle => {
    this.setState({ draftArticle });
  };

  render() {
    const { mode, article, brands } = this.props;
    const { locales, currentLocale, draftArticle } = this.state;

    const keys = Object.keys(locales);
    const availableLocales = LANGS.filter(({ id }) => !keys.includes(id));
    const addedLocales = LANGS.filter(({ id }) => keys.includes(id));

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
      <div className="article-page-edit page-content">
        <div className="title">Рэдактар артыкулаў</div>
        <Form onSubmit={this.handleSubmit} defaultValues={article || initArticle}>
          {formApi => (
            <form className="common-data" onSubmit={formApi.submitForm}>
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
            </form>
          )}
        </Form>
        <div className="localized-data">
          <div className="localized-data-title">Лакалізаваць артыкул</div>
          {!!availableLocales.length && (
            <Select
              dropdown
              className="add-locale-button"
              placeholder="Дадаць лакалізацыю"
              options={availableLocales}
              onChange={l => this.setState({ locales: { ...locales, [l]: {} }, currentLocale: l })}
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
            <LocaleContext.Consumer>
              {lang => (
                <EditLocaleForm
                  lang={lang}
                  mode={mode}
                  locale={currentLocale}
                  createArticle={this.handleSubmit}
                  draftArticle={draftArticle}
                />
              )}
            </LocaleContext.Consumer>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleForm);
