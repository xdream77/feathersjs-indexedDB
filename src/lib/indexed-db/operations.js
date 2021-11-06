/**
 * 
 * Documentation:
 *  -> nanoid: https://github.com/ai/nanoid#readme
 *  -> ramda: https://ramdajs.com/docs/
 *  -> localforage: https://localforage.github.io/localForage/
 *  -> feathers service -> https://docs.feathersjs.com/api/services.html#service-methods
 * 
 */

import { nanoid } from 'nanoid';
import { curry, mergeDeepRight, pick, isEmpty, always } from 'ramda';
import { toArray, returnKeyValue } from '../util/index.js';
import { sorter, AdapterService } from '@feathersjs/adapter-commons';
import sift from 'sift';
 
export const adapter = new AdapterService();

const setResultsTotal = result => (
    result.total = result.data.length,
    result
);

const filterFn = {
    $sort  : (data, value) => data.sort(sorter(value)),
    $skip  : (data, value) => data.slice(value),
    $limit : (data, value) => data.slice(0, value),
    $select: (data, value) => data.map(pick(value))
};

const applyFilters = curry((filters, result) => {
    Object.entries(filterFn)
        .filter(([key]) => filters[key])
        .forEach(([key,value]) => {
            result.data = value(result.data, filters[key]);        
        });
    return result;
});

export const findInStore = (store, params) => {
    const { query, filters, paginate } = adapter.filterQuery(params);

    const result = {
        total: 0,
        limit: filters.$limit || 0,
        skip : filters.$skip || 0,
        data : []
    };


    const items = store
        .iterate((dbItem, key) => {
            const push = sift(query)(dbItem);
            if(push) result.data.push(returnKeyValue(key, dbItem)); 
        });

    return items
        .then(always(result))
        .then(setResultsTotal)
        .then(applyFilters(filters));
        
};
 
export const saveSingle = curry((key = nanoid(), store, item) =>
    store.setItem(key, item)
        .then(returnKeyValue(key))
);
 
export const removeItem = curry((store, { id }) => store.removeItem(id));
 
export const removeAllItems = curry((store, items) => 
    Promise.all(items.map(item => removeItem(store, item))).then(() => items)
);
 
export const pickProperties = curry((selection, data) => 
    isEmpty(selection) 
        ? data 
        : pick(selection, data)
);
 
export const updateAllItems = curry((data, store, items) =>
    Promise.all(items.map(item => saveSingle(item.id, store, data)))
);
export const updateItems = curry((data, items) =>
    items.map(({id}) => ({ id, ...data }))
);
 
export const saveItems = curry((store, dataArray) => {
 
});
 
 
export const patchAllItems = curry((data, store, items) => 
    Promise.all(items.map(({id, ...item}) => saveSingle(id, store, mergeDeepRight(item, data))))
);
 
export const getDbItems = (store, id, params) => 
    id 
        ? store.getItem(id).then(returnKeyValue(id)).then(toArray)
        : findInStore(store, params);