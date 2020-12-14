import React from 'react';
import PropTypes from 'prop-types';

export default function Select({
  onChangeHandler,
  currencies,
  currency,
  className,
}) {
  return (
    <select onChange={onChangeHandler} className={className}>
      {currency ? <option value={currency}>{currency}</option> : null}
      {currencies ? currencies.filter((crnc) => crnc !== currency)
        .map((crnc) => <option key={crnc} value={crnc}>{crnc}</option>) : null}
    </select>
  );
}

Select.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
  currency: PropTypes.string,
  className: PropTypes.string,
};

Select.defaultProps = {
  currencies: null,
  currency: null,
  className: null,
};
