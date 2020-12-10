/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  status: 'idle',
  error: null,
  currencies: [],
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
  },
  extraReducers: {
    [fetchCurrencyRates.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchCurrencyRates.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.currencies = Object.keys(action.payload.rates);
      state.base = action.payload.base;
    },
    [fetchCurrencyRates.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { changeStatus } = currencySlice.actions;

export default currencySlice.reducer;
