import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CurrencyList.module.css';

import CurrencySelect from '../CurrencySelect/CurrencySelect';

import { fetchCurrencyRates, changeStatus } from '../../features/currencySlice';

export default function CurrencyList() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.currency.data);
  const currencies = useSelector((state) => state.currency.currencies);
  const currencyStatus = useSelector((state) => state.currency.status);

  const [firstCurrency, setFirstCurrency] = useState('EUR');
  const [secondCurrency, setSecondCurrency] = useState('USD');
  const [firstCurrencyValue, setFirstCurrencyValue] = useState(1);
  const [secondCurrencyValue, setSecondCurrencyValue] = useState(0);

  function getKeyByValue(value) {
    setSecondCurrencyValue(data.rates[value]);
  }

  useEffect(() => {
    if (currencyStatus === 'idle') {
      dispatch(fetchCurrencyRates(firstCurrency));
    }
    if (currencyStatus === 'succeeded') {
      getKeyByValue(secondCurrency);
    }
  }, [currencyStatus, dispatch]);

  function onChangeCurrencyHandler({ target }) {
    if (target.classList.contains('first-currency-select')) {
      setFirstCurrency(target.value);
      dispatch(changeStatus());
    }
    if (target.classList.contains('second-currency-select')) {
      setSecondCurrency(target.value);
      getKeyByValue(target.value);
    }
  }

  function onNumberChangeHandler({ target }) {
    setFirstCurrencyValue(target.value);
  }

  function calcCurrencyRate() {
    return (firstCurrencyValue * secondCurrencyValue).toFixed(2);
  }

  return (
    <div className={classes.CurrencyList}>
      <div className={classes.LeftBlock}>
        <CurrencySelect
          onChangeHandler={onChangeCurrencyHandler}
          currencies={currencies}
          currency={firstCurrency}
          className="first-currency-select"
        />
      </div>
      <div className={classes.MiddleBlock}>
        <time>
          Updated on:
          <br />
          {data.date}
        </time>
        <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder={firstCurrencyValue} onChange={onNumberChangeHandler} />
        <p>{`${firstCurrencyValue} ${firstCurrency} = ${calcCurrencyRate()} ${secondCurrency}`}</p>
      </div>
      <div className={classes.RightBlock}>
        <CurrencySelect
          onChangeHandler={onChangeCurrencyHandler}
          currencies={currencies}
          currency={secondCurrency}
          className="second-currency-select"
        />
      </div>
    </div>
  );
}
