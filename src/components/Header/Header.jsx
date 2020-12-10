import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './Header.module.sass';

export default function Header() {
  const savedCurrencies = useSelector((state) => state.currency.savedCurrencies);

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
          exact
          activeClassName={classes.Active}
        >
          Converter
        </NavLink>
      </nav>
      <ul className={classes.SavedCurrenciesList}>
        {savedCurrencies ? savedCurrencies.map((cur) => (
          <li key={cur}>{cur}</li>
        )) : null}
      </ul>
    </header>
  );
}
