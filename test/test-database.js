import localforage from 'localforage';
import * as memoryDriver from 'localforage-driver-memory';

localforage.defineDriver(memoryDriver);

jest.mock('./../lib/storage.js');
import makeStore from './../lib/storage.js';

makeStore.mockImplementation( 
    name => localforage.createInstance({ 
        name  : name || 'You are lost', 
        driver: memoryDriver._driver
    })
);

export default (service) => 
    service.find()
        .then(({ data }) => Promise.all(data.map( item => service.remove(item.id) )));