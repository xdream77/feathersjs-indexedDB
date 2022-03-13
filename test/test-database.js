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

const mockData = [
    { id: 'awesome-0', first: 'bob', last: 'smith', age: 33 },
    { id: 'awesome-1', first: 'anna', last: 'hope', age: 34 },
    { id: 'awesome-2', first: 'john', last: 'miller', age: 33 },
    { id: 'awesome-3', first: 'andrew', last: 'stinson', age: 26 },
    { id: 'awesome-4', first: 'marc', last: 'winger', age: 69 },
    { id: 'awesome-5', first: 'tim', last: 'miller', age: 55 },
];

export const cleanup = (service) => 
    service.find()
        .then(({ data }) => Promise.all(data.map( item => service.remove(item.id) )));


export const fill = (service) => service.create(mockData);

