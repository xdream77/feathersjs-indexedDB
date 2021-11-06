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
import { map, always } from 'ramda';
import { isArray, returnArray, toArray, returnKeyValue } from '../util/index.js';
import { pickProperties, findInStore, saveSingle, getDbItems, updateAllItems, patchAllItems, removeAllItems } from './operations.js';
export default ({ name }) => {
    const store = localforage.createInstance({
        name: name || 'You-are-lost'
    });
    
    return {
        get: (id, { $select = [] }) =>
            store.getItem(id)
                .then(pickProperties($select))
                .catch(always({}))
        ,

        find: (params) => 
            findInStore(store, params)
                .catch(returnArray)
        ,

        create: (data) => 
            isArray(data)
                ? Promise.all(data.map(item => saveSingle(undefined, store, item)))
                : saveSingle(undefined, store, data)
                    .then(toArray)
                    .catch(returnArray)
        ,

        update: (id, data, params) =>
            getDbItems(id, params, store)
                .then(updateAllItems(data, store))
                .catch(returnArray)
        ,

        patch: (id, data, params) => 
            getDbItems(id, params, store)
                .then(patchAllItems(data, store))
                .catch(returnArray)
        ,
        
        remove: (id, params) => 
            getDbItems(id, params, store)
                .then(map(returnKeyValue(id)))
                .then(removeAllItems(store))
                .catch(returnArray)
    };
};