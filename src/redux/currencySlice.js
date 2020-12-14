/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sortByAlphabet } from '../helpers/helpers';

const initialState = {
  data: {},
  status: 'idle',
  base: 'EUR',
  error: null,
  currencies: [],
  savedCurrencies: ['EUR'],
};

const API = 'https://api.exchangeratesapi.io/latest';

export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetchCurrencyRates',
  async (base = 'EUR') => {
    const response = await fetch(`${API}?base=${base}`)
      .then((res) => res.json())
      .then((res) => res);

    return response;
  },
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    // Change status if currency has been changed.
    changeStatus(state) {
      state.status = 'idle';
    },
    addCurrencyToSaved(state, action) {
      state.savedCurrencies.push(action.payload);
    },
    changeBaseCurrency(state, action) {
      state.base = action.payload;
      state.status = 'idle';
    },
  },
  extraReducers: {
    [fetchCurrencyRates.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchCurrencyRates.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.currencies = sortByAlphabet(Object.keys(action.payload.rates));
    },
    [fetchCurrencyRates.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { changeStatus, addCurrencyToSaved, changeBaseCurrency } = currencySlice.actions;

export default currencySlice.reducer;
