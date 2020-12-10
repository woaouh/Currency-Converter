import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.module.sass';

import Header from './Header/Header';
import Converter from '../pages/Converter';
import Rates from '../pages/Rates';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/converter">
            <Converter />
          </Route>
          <Route path="/">
            <Rates />
          </Route>
        </Switch>
      </main>
    </>
  );
}
