import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ placeholder, onChangeHandler }) {
  return <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder={placeholder} onChange={onChangeHandler} />;
}

Input.propTypes = {
  placeholder: PropTypes.number.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};
