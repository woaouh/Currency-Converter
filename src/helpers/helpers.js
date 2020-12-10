/* eslint-disable import/prefer-default-export */
export const getValueByKey = (obj, value) => obj[value];

export const calcCurrencyRate = (firstCur, secondCur) => (firstCur * secondCur).toFixed(2);

export const sortByAlphabet = (arr) => arr.slice().sort((a, b) => a.localeCompare(b));
