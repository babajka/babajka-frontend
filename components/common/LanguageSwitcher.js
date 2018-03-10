import React from 'react';
import PropTypes from 'prop-types';

const LanguageSwitcher = ({ currentLang, langs, onClick }) => (
  <div className="select current-lang">
    <select>
      {langs &&
        langs.length &&
        langs.map(lang => (
          <option
            onClick={() => onClick(lang)}
            key={lang.id}
            className="lang"
            selected={lang.id === currentLang.id}
          >
            {lang.value}
          </option>
        ))}
    </select>
  </div>
);

LanguageSwitcher.propTypes = {
  currentLang: PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  langs: PropTypes.arrayOf({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
};

LanguageSwitcher.defaultProps = { currentLang: null, langs: null, onClick: null };

export default LanguageSwitcher;
