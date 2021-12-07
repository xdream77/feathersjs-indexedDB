/**
 * 
 * Documentation:
 *  -> sift: https://www.npmjs.com/package/sift
 *  -> nanoid: https://github.com/ai/nanoid#readme
 *  -> ramda: https://ramdajs.com/docs/
 *  -> feathers adapter-commons: https://github.com/feathersjs/feathers/tree/dove/packages/adapter-commons
 * 
 */

import sift from 'sift';
import { nanoid } from 'nanoid';
import { curry, mergeDeepRight, pick, isEmpty, always, assoc } from 'ramda';
import { sorter, AdapterService } from '@feathersjs/adapter-commons';
import { toArray, returnKeyValue, isArray, toEmptyResult } from './util.js';
 
const adapter = new AdapterService();

const setResultsTotal = result => assoc('total', result.data.length, result);
const removeItem = curry((store, { id }) => store.removeItem(id));

const filterFn = {
    $sort  : (data, value) => data.sort(sorter(value)),
    $skip  : (data, value) => data.slice(value),
    $limit : (data, value) => data.slice(0, value),
    $select: (data, value) => data.map(pickProperties(value))
};

const resultObj = ({ $limit = 0, $skip = 0 } = {}) => ({
    total: 0,
    limit: $limit,
    skip : $skip,
    data : []
});

const applyFilters = curry((filters, result) => {
    const data = Object.entries(filterFn)
        .filter(([key]) => filters[key])
        .reduce((data, [key,value]) => value(data, filters[key]), result.data);
    
    return assoc('data', data, result);
});

export const findInStore = curry((store, params) => {
    const { query, filters } = adapter.filterQuery(params);
    const result = resultObj(filters);

    const items = store.iterate((dbItem, key) => {
        const push = sift(query)(dbItem);
        if(push) result.data.push(returnKeyValue(key, dbItem)); 
    });

    return items
        .then(always(result))
        .then(setResultsTotal)
        .then(applyFilters(filters));
        
});
 
export const saveSingle = curry((key = nanoid(), store, item) =>
    store.setItem(key, item)
        .then(returnKeyValue(key))
);

export const pickProperties = curry((selection, data) => 
    isArray(selection) && !isEmpty(selection)
        ? pick(selection, data) 
        : data
);

export const removeAllItems = curry((store, items) => 
    Promise.all(items.data.map(item => removeItem(store, item))).then(() => items)
);

export const updateAllItems = curry((data, store, items) =>
    Promise.all(items.data.map(item => saveSingle(item.id, store, data)))
);

export const patchAllItems = curry((data, store, items) => 
    Promise.all(items.data.map(({id, ...item}) => saveSingle(id, store, mergeDeepRight(item, data))))
);

export const getDbItems = (id, params, store) => 
    !id 
        ? findInStore(store, params)
        : store
            .getItem(id)
            .then(returnKeyValue(id))
            .then(toArray)
            .then(toEmptyResult);