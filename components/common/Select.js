import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import cn from 'classnames';

import Clickable from './Clickable';
import Button from './Button';
import Icon from './Icon';

const DEFAULT_STATE = { selectedItem: null, inputValue: '', highlightedIndex: 0 };

const Arrow = ({ isOpen }) => (
  <span className="icon is-small is-right">
    <Icon name={`angle-${isOpen ? 'down' : 'up'}`} aria-hidden="true" />
  </span>
);

// TODO: extract Dropdown component (like lang switcher)
// TODO: fix searchable mode
const Select = ({
  className,
  size,
  value,
  options,
  valueWholeObject,
  clerable,
  searchable,
  dropdown,
  placeholder,
  renderOption,
  onChange,
}) => (
  <Downshift
    defaultSelectedItem={options.find(({ id }) => id === value)}
    onChange={item => onChange(valueWholeObject ? item : item && item.id)}
    itemToString={i => (i == null ? '' : i.label)}
    render={({
      getInputProps,
      getItemProps,
      getToggleButtonProps,
      isOpen,
      inputValue,
      selectedItem: selected,
      reset,
    }) => (
      <div
        className={cn(
          'babajka-dropdown dropdown',
          className,
          { 'is-active': isOpen },
          `size-${size}`
        )}
      >
        <div className="babajka-dropdown__trigger dropdown-trigger">
          {dropdown && (
            <Button {...getToggleButtonProps({ className: `button size-${size}` })}>
              <span>{placeholder}</span>
              <Arrow isOpen={isOpen} />
            </Button>
          )}
          {!dropdown && (
            <div {...getToggleButtonProps({ className: 'control has-icons-right' })}>
              {searchable && (
                <input
                  {...getInputProps({
                    className: 'babajka-dropdown-input input',
                    placeholder,
                  })}
                />
              )}
              {!searchable && (
                <div className="babajka-dropdown-input input">
                  {selected ? renderOption(selected) : placeholder}
                </div>
              )}
              <Arrow isOpen={isOpen} />
            </div>
          )}
        </div>
        {selected &&
          clerable && (
            <Clickable
              tag="span"
              className="babajka-dropdown-clear"
              onClick={reset.bind(null, DEFAULT_STATE)}
            >
              ×
            </Clickable>
          )}
        <div className="babajka-dropdown-menu dropdown-menu" id="dropdown-menu" role="menu">
          <ul className="babajka-dropdown-content dropdown-content">
            {options
              .filter(
                ({ label }) =>
                  !searchable ||
                  !inputValue ||
                  label.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map(item => (
                <li
                  {...getItemProps({ item })}
                  className={cn('dropdown-item', {
                    'is-active': selected && selected.id === item.id,
                  })}
                  key={item.id}
                >
                  {renderOption(item)}
                </li>
              ))}
          </ul>
        </div>
      </div>
    )}
  />
);

Select.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    })
  ).isRequired,
  valueWholeObject: PropTypes.bool,
  searchable: PropTypes.bool,
  clerable: PropTypes.bool,
  dropdown: PropTypes.bool,
  placeholder: PropTypes.string,
  renderOption: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  className: '',
  size: 'm',
  value: null,
  valueWholeObject: false,
  searchable: false,
  clerable: false,
  dropdown: false,
  placeholder: 'Select...',
  renderOption: ({ label }) => label,
};

export default Select;
