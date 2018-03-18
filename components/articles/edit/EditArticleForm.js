import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Radio, RadioGroup, Select } from 'react-form';

import { ArticleShape, BrandsArray } from 'utils/customPropTypes';
import { actions, selectors } from 'redux/ducks/articles';

// import Button from 'components/common/Button';
// import text from 'constants/dictionary';

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
    currentLocale: 'be',
    draftArticle: initArticle,
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
    const { currentLocale, draftArticle } = this.state;
    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <div>
        <Form onSubmit={this.handleSubmit} defaultValues={article || initArticle}>
          {formApi => (
            <form onSubmit={formApi.submitForm}>
              <RadioGroup field="type">
                {group => (
                  <div>
                    <label htmlFor="radio-input-text">Text</label>
                    <Radio group={group} value="text" id="radio-input-text" />
                    <label htmlFor="radio-input-video">Video</label>
                    <Radio group={group} value="video" id="radio-input-video" />
                  </div>
                )}
              </RadioGroup>
              {brands && (
                <Select
                  field="brand"
                  id="brand"
                  options={brands.map(({ slug: value, name: label }) => ({ value, label }))}
                />
              )}
              {/* <div>
                <Button
                  type="submit"
                  // pending={pending}
                  onClick={formApi.submitForm}
                >
                  {text.next}
                </Button>
              </div> */}
            </form>
          )}
        </Form>
        <EditLocaleForm
          mode={mode}
          createArticle={this.handleSubmit}
          locale={currentLocale}
          draftArticle={draftArticle}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleForm);
