import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  children, onClick, value, disabled,
}) {
  return <button type="button" onClick={onClick} value={value} disabled={disabled}>{children}</button>;
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
