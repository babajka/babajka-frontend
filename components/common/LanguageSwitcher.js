import React from 'react';
import PropTypes from 'prop-types';

const LanguageSwitcher = ({ currentLang, langs, onClick }) => (
  <div className="select current-lang">
    <select defaultValue={currentLang.id || langs[0].id}>
      {langs &&
        langs.length &&
        langs.map(lang => (
          <option onClick={() => onClick(lang)} key={lang.id} value={lang.id} className="lang">
            {lang.value}
          </option>
        ))}
    </select>
  </div>
);

LanguageSwitcher.propTypes = {
  currentLang: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  langs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func,
};

LanguageSwitcher.defaultProps = { currentLang: null, langs: null, onClick: null };

export default LanguageSwitcher;
