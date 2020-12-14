import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './Header.module.sass';

import Select from '../Select/Select';
import { changeBaseCurrency } from '../../redux/currencySlice';

export default function Header() {
  const dispatch = useDispatch();
  const savedCurrencies = useSelector((state) => state.currency.savedCurrencies);

  function onChangeSavedCurrencyHandler({ target }) {
    dispatch(changeBaseCurrency(target.value));
  }

  return (
    <header className={classes.Header}>
      <nav>
        <NavLink
          to="/"
          exact
          activeClassName={classes.Active}
        >
          Home
        </NavLink>
        <NavLink
          to="/converter"
          activeClassName={classes.Active}
        >
          Converter
        </NavLink>
      </nav>
      <ul className={classes.SavedCurrenciesList}>
        {savedCurrencies ? (
          <Select
            currencies={savedCurrencies}
            onChangeHandler={onChangeSavedCurrencyHandler}
          />
        ) : null}
      </ul>
    </header>
  );
}
