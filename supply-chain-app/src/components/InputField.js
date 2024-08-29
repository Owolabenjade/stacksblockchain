import React from 'react';

const InputField = ({ value, onChange, placeholder, type = 'text', ariaLabel }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="form-control mb-3"
    aria-label={ariaLabel} // Added aria-label for accessibility
  />
);

export default InputField;