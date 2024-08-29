import React from 'react';

const InputField = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="form-control mb-3"
  />
);

export default InputField;