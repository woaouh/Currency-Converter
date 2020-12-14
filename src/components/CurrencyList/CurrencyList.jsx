import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CurrencyList.module.sass';

import { fetchCurrencyRates, addCurrencyToSaved } from '../../redux/currencySlice';
import { getValueByKey, calcCurrencyRate } from '../../helpers/helpers';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

export default function CurrencyList() {
  const dispatch = useDispatch();
  const base = useSelector((state) => state.currency.base);
  const data = useSelector((state) => state.currency.data);
  const currencies = useSelector((state) => state.currency.currencies);
  const savedCurrencies = useSelector((state) => state.currency.savedCurrencies);
  const currencyStatus = useSelector((state) => state.currency.status);
  const currencyError = useSelector((state) => state.currency.error);

  const [currencyValue, setCurrencyValue] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (currencyStatus === 'idle') {
      dispatch(fetchCurrencyRates(base));
    }
  }, [currencyStatus, dispatch, base]);

  function onAddCurrencyHandler(cur) {
    if (savedCurrencies.length < 2) {
      dispatch(addCurrencyToSaved(cur));
    }
  }

  function onChangeInputValueHandler({ target }) {
    if (Number.isInteger(parseInt(target.value, 10))) {
      setCurrencyValue(parseInt(target.value, 10));
    } else if (target.value === '') {
      setCurrencyValue(1);
    } else {
      setErrorMessage('Input value must be a number.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  let content;

  if (currencyStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (currencyStatus === 'failed') {
    content = (
      <div>
        Try to refresh the page
        {' '}
        {currencyError}
      </div>
    );
  } else if (currencyStatus === 'succeeded') {
    content = (
      <>
        <div className={classes.InputBlock}>
          <Input placeholder={currencyValue} onChangeHandler={onChangeInputValueHandler} />
          <p>
            {' '}
            {base}
            {' '}
            equals
          </p>
          {errorMessage ? <p className={classes.ErrorMessage}>{errorMessage}</p> : null}
        </div>
        <table className={classes.CurrencyList}>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
              <th>
                To Saved
                {' '}
                <small>2 max</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((cur) => (
              <tr key={cur}>
                <td>{cur}</td>
                <td>{calcCurrencyRate(currencyValue, getValueByKey(data.rates, cur))}</td>
                <td>
                  <Button
                    onClick={() => onAddCurrencyHandler(cur)}
                    value={cur}
                    disabled={!(savedCurrencies.length < 2)}
                  >
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return <section>{content}</section>;
}
