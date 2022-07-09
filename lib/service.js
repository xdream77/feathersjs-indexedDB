/**
 * 
 * Documentation:
 *  -> ramda: https://ramdajs.com/docs/
 *  -> feathers service -> https://docs.feathersjs.com/api/services.html#service-methods
 * 
 */

import { pathOr } from 'ramda';
import { isArray, logErrorReturnEmpty, toArray, returnKeyValue } from './util.js';
import { pickProperties, findInStore, saveSingle, getDbItems, updateAllItems, patchAllItems, removeAllItems } from './operations.js';
import makeStore from './storage.js';

const getSelect = pathOr([], ['query', '$select']);

export default ({ name }) => {
    
    const store = makeStore(name);
    
    return {
        get: (id, params) => {
            const selection = getSelect(params);
            return store.getItem(id)
                .then(returnKeyValue(id))
                .then(pickProperties(selection))
                .catch(logErrorReturnEmpty);
        },

        find: (params) => 
            findInStore(store, params)
                .catch(logErrorReturnEmpty)
        ,

        create: (data) => 
            isArray(data)
                ? Promise.all(data.map(item => saveSingle(item.id, store, item)))
                : saveSingle(data.id, store, data)
                    .then(toArray)
                    .catch(logErrorReturnEmpty)
        ,

        update: (id, data, params) =>
            getDbItems(id, params, store)
                .then(updateAllItems(data, store))
                .catch(logErrorReturnEmpty)
        ,

        patch: (id, data, params) => 
            getDbItems(id, params, store)
                .then(patchAllItems(data, store))
                .catch(logErrorReturnEmpty)
        ,
        
        remove: (id, params) => 
            getDbItems(id, params, store)               
                .then(removeAllItems(store))
                .catch(logErrorReturnEmpty)
    };
};