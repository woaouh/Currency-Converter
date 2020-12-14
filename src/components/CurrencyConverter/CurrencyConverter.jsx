import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CurrencyConverter.module.sass';

import Select from '../UI/Select/Select';

import { fetchCurrencyRates, changeStatus } from '../../redux/currencySlice';
import { getValueByKey, calcCurrencyRate } from '../../helpers/helpers';
import Input from '../UI/Input/Input';

export default function CurrencyConverter() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.currency.data);
  const currencies = useSelector((state) => state.currency.currencies);
  const currencyStatus = useSelector((state) => state.currency.status);

  const [firstCurrency, setFirstCurrency] = useState('EUR');
  const [secondCurrency, setSecondCurrency] = useState('USD');
  const [firstCurrencyValue, setFirstCurrencyValue] = useState(1);
  const [secondCurrencyValue, setSecondCurrencyValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (currencyStatus === 'idle') {
      dispatch(fetchCurrencyRates(firstCurrency));
    }
    if (currencyStatus === 'succeeded') {
      setSecondCurrencyValue(getValueByKey(data.rates, secondCurrency));
    }
  }, [currencyStatus, dispatch]);

  function onChangeCurrencyHandler({ target }) {
    if (target.classList.contains('first-currency-select')) {
      setFirstCurrency(target.value);
      dispatch(changeStatus());
    }
    if (target.classList.contains('second-currency-select')) {
      setSecondCurrency(target.value);
      setSecondCurrencyValue(getValueByKey(data.rates, target.value));
    }
  }

  function onNumberChangeHandler({ target }) {
    setFirstCurrencyValue(parseInt(target.value, 10));
    if (Number.isInteger(parseInt(target.value, 10))) {
      setFirstCurrencyValue(parseInt(target.value, 10));
    } else if (target.value === '') {
      setFirstCurrencyValue(1);
    } else {
      setErrorMessage('Input value must be a number.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  return (
    <section className={classes.CurrencyConverter}>
      <div className={classes.LeftBlock}>
        <Select
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
        <div className={classes.InputBlock}>
          <Input placeholder={firstCurrencyValue} onChangeHandler={onNumberChangeHandler} />
          {errorMessage ? <p className={classes.ErrorMessage}>{errorMessage}</p> : null}
        </div>
        <p>{`${firstCurrencyValue} ${firstCurrency} = ${calcCurrencyRate(firstCurrencyValue, secondCurrencyValue)} ${secondCurrency}`}</p>
      </div>
      <div className={classes.RightBlock}>
        <Select
          onChangeHandler={onChangeCurrencyHandler}
          currencies={currencies}
          currency={secondCurrency}
          className="second-currency-select"
        />
      </div>
    </section>
  );
}
