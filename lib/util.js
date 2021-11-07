import { curry } from 'ramda';

export const { isArray } = Array;

export const logErrorReturnArray = (e) => (console.trace(e),[]);

export const logErrorReturnObject = (e) => (console.trace(e),{});

export const toArray = value => isArray(value) ? value : [value];

export const returnKeyValue = curry((id,value) => ({ id, ...value }));