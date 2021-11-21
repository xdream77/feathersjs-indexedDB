/**
 * 
 * Documentation:
 *  -> localforage: https://localforage.github.io/localForage/
 *  -> ramda: https://ramdajs.com/docs/
 *  -> feathers service -> https://docs.feathersjs.com/api/services.html#service-methods
 * 
 */

import localforage from 'localforage';
import { curry } from 'ramda';
import { isArray, logErrorReturnArray, logErrorReturnObject, toArray, returnKeyValue } from './util.js';
import { pickProperties, findInStore, saveSingle, getDbItems, updateAllItems, patchAllItems, removeAllItems } from './operations.js';

const store = curry((localforage, name) => localforage.createInstance({ name: name || 'You-are-lost' }));
const makeStore = store(localforage);

export default ({ name }) => {
    
    const store = makeStore(name);
    
    return {
        get: (id, { $select = [] }) =>
            store.getItem(id)
                .then(returnKeyValue(id))
                .then(pickProperties($select))
                .catch(logErrorReturnObject)
        ,

        find: (params) => 
            findInStore(store, params)
                .catch(logErrorReturnArray)
        ,

        create: (data) => 
            isArray(data)
                ? Promise.all(data.map(item => saveSingle(undefined, store, item)))
                : saveSingle(undefined, store, data)
                    .then(toArray)
                    .catch(logErrorReturnArray)
        ,

        update: (id, data, params) =>
            getDbItems(id, params, store)
                .then(updateAllItems(data, store))
                .catch(logErrorReturnArray)
        ,

        patch: (id, data, params) => 
            getDbItems(id, params, store)
                .then(patchAllItems(data, store))
                .catch(logErrorReturnArray)
        ,
        
        remove: (id, params) => 
            getDbItems(id, params, store)               
                .then(removeAllItems(store))
                .catch(logErrorReturnArray)
    };
};