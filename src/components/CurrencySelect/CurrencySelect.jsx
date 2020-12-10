import React from 'react';
import PropTypes from 'prop-types';

export default function CurrencySelect({
  onChangeHandler,
  currencies,
  currency,
  className,
}) {
  return (
    <select onChange={onChangeHandler} className={className}>
      <option value={currency}>{currency}</option>
      {currencies.filter((crnc) => crnc !== currency)
        .map((crnc) => <option key={crnc} value={crnc}>{crnc}</option>)}
    </select>
  );
}

CurrencySelect.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  currency: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
