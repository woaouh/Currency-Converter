import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CurrencyList.module.sass';

import { fetchCurrencyRates, addCurrencyToSaved } from '../../features/currencySlice';
import { getValueByKey, calcCurrencyRate } from '../../helpers/helpers';
import Button from '../Button/Button';

export default function CurrencyList() {
  const dispatch = useDispatch();
  const base = useSelector((state) => state.currency.base);
  const data = useSelector((state) => state.currency.data);
  const currencies = useSelector((state) => state.currency.currencies);
  const savedCurrencies = useSelector((state) => state.currency.savedCurrencies);
  const currencyStatus = useSelector((state) => state.currency.status);

  useEffect(() => {
    if (currencyStatus === 'idle') {
      dispatch(fetchCurrencyRates(base));
    }
  }, [currencyStatus, dispatch]);

  function onAddCurrencyHandler(cur) {
    if (savedCurrencies.length < 2) {
      dispatch(addCurrencyToSaved(cur));
    }
  }

  return (
    <>
      <p>
        1
        {' '}
        {base}
        {' '}
        equals
      </p>
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
              <td>{calcCurrencyRate(25, getValueByKey(data.rates, cur))}</td>
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
