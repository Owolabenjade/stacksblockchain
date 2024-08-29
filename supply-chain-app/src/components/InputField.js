// src/components/InputField.js

import React from 'react';

const InputField = React.memo(({ value, onChange, placeholder, type = 'text', ariaLabel }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="form-control mb-3"
    aria-label={ariaLabel}
  />
));

export default InputField;