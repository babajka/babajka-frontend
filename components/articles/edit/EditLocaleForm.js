import React from 'react';
import PropTypes from 'prop-types';
import { Text, TextArea } from 'react-form';
import get from 'lodash/get';

import Button from 'components/common/Button';
import Clickable from 'components/common/Clickable';
import Icon from 'components/common/Icon';
import Editor from './Editor';

const EditLocaleForm = ({ prefix, formApi, onRemove }) => (
  <div className="inputs">
    <div className="basics">
      <Text
        id={`${prefix}.title`}
        field={`${prefix}.title`}
        className="long-input input spaced"
        placeholder="Назва артыкула"
      />
      <div className="long-input field spaced">
        <Text
          id={`${prefix}.slug`}
          field={`${prefix}.slug`}
          className="input"
          placeholder="Напрыклад: bielaruskaje-kino"
        />
        <p className="help">Slug артыкула: вызначае адрас артыкула ў інтэрнэце</p>
      </div>
      <div className="field spaced">
        <div className="control">
          <TextArea
            id={`${prefix}.subtitle`}
            field={`${prefix}.subtitle`}
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
        content={get(formApi.values, `${prefix}.text`)}
        onChange={body => formApi.setValue(`${prefix}.text`, body)}
      />
    </div>
    <div className="action-buttons">
      <Clickable tag="div" className="remove-button button" onClick={onRemove}>
        <span className="icon is-small">
          <Icon name="remove" />
        </span>
        <span>Выдаліць лакалізацыю</span>
      </Clickable>
      <Button className="save-button button" type="submit">
        Захаваць для публікацыі
      </Button>
    </div>
  </div>
);

EditLocaleForm.propTypes = {
  prefix: PropTypes.string.isRequired,
  formApi: PropTypes.shape({
    values: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default EditLocaleForm;
