import { curry } from 'ramda';

export const toEmptyResult = (arr = []) => ({
    total: 0,
    limit: 0,
    skip : 0,
    data : arr
});

export const { isArray } = Array;

export const logErrorReturnEmpty = (e) => (console.trace(e), toEmptyResult());

export const toArray = value => isArray(value) ? value : [value];

export const returnKeyValue = curry((id,value) => ({ ...value, id }));