import {
  bool, func, oneOfType, string
} from 'prop-types';
import React from 'react';

const InputCheckbox = ({
  checked,
  fieldName,
  handleChange,
  value
}) => (
  <input
    defaultChecked={checked}
    id={`${fieldName}-${value}`}
    name={fieldName}
    type='checkbox'
    value={value}
    data-testid='test-input-checkbox'
    onChange={handleChange}
  />
);

InputCheckbox.defaultProps = {
  checked: false,
  handleChange: () => null
};

InputCheckbox.propTypes = {
  checked: bool,
  fieldName: string.isRequired,
  handleChange: func,
  value: oneOfType([string, bool])
};

export default InputCheckbox;
