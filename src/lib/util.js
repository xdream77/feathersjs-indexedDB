import { curry } from 'ramda';

export const { isArray } = Array;

export const returnArray = () => [];

export const toArray = value => isArray(value) ? value : [value];

export const returnKeyValue = curry((id,value) => ({ id, ...value }));