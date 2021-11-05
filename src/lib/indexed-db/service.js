/**
 * 
 * Documentation:
 *  -> nanoid: https://github.com/ai/nanoid#readme
 *  -> ramda: https://ramdajs.com/docs/
 *  -> localforage: https://localforage.github.io/localForage/
 *  -> feathers service -> https://docs.feathersjs.com/api/services.html#service-methods
 * 
 */

import localforage from 'localforage';
import { nanoid } from 'nanoid';
import { whereEq, curry, mergeDeepRight, pick, isEmpty, map, update } from 'ramda';
import { isArray, returnArray, toArray, returnKeyValue } from '../util/index.js';


const findInStore = (store,query) => {
    const result = [];
    const returnResult = () => result;

    return store.iterate((dbItem, key) => {
        const push = whereEq(query, dbItem);
        if(push) result.push(returnKeyValue(key, dbItem));
    })
        .then(returnResult);
};

const saveSingle = curry((key = nanoid(), store, item) =>
    store.setItem(key, item)
        .then(returnKeyValue(key))
);

const removeItem = curry((store, { id }) => store.removeItem(id));

const removeAllItems = curry((store, items) => 
    Promise.all(items.map(item => removeItem(store, item))).then(() => items)
);

const pickProperties = curry((selection, data) => 
    isEmpty(selection) 
        ? data 
        : pick(selection, data)
);

const updateAllItems = curry((data, store, items) =>
    Promise.all(items.map(item => saveSingle(item.id, store, data)))
);
const updateItems = curry((data, items) =>
    items.map(({id}) => ({ id, ...data }))
);

const saveItems = curry((store, dataArray) => {

});


const patchAllItems = curry((data, store, items) => 
    Promise.all(items.map(({id, ...item}) => saveSingle(id, store, mergeDeepRight(item, data))))
);

const getDbItems = (store, id, { query = {} }) => 
    id 
        ? store.getItem(id).then(returnKeyValue(id)).then(toArray)
        : findInStore(store, query);

export default ({ name }) => {
    const store = localforage.createInstance({
        name: name || 'You-are-lost'
    });

    return {
        get: (id, { $select = [] }) =>
            store.getItem(id)
                .then(pickProperties($select))
                .then(toArray)
                .catch(returnArray)
        ,

        find: (params = { query: {} }) =>
            findInStore(store, params.query)
                .catch(returnArray)
        ,

        create: (data) => 
            isArray(data)
                ? Promise.all(data.map(item => saveSingle(undefined, store, item)))
                : saveSingle(undefined, store, data).then(toArray)
        ,

        update: (id, data, params = { query: {} }) =>
            getDbItems(store, id, params)
                /* .then(updateItems(data))
                .then(saveItems(store)) */
                .then(updateAllItems(data, store))
                .catch(returnArray)
        ,

        patch: (id, data, params = { query: {} }) => { 
            return getDbItems(store, id, params)
                .then(patchAllItems(data, store))
                .catch(returnArray);
        }
        ,
        
        remove: (id, params = { query: {} }) => 
            getDbItems(store, id, params.query)
                .then(map(returnKeyValue(id)))
                .then(removeAllItems(store))
                .catch(returnArray)
    };
};