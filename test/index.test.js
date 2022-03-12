import { makeLocalService, makeLocalServices } from './../index.js';


describe('index', () => {
    it('creates a feathers Service', () => {
        expect.assertions(2);

        const service = makeLocalService('test-db');
        expect(service).toBeTruthy();
        expect(service).toHaveProperty('services');
    });

    it('creates multiple feathers Services', () => {
        expect.assertions(4);
        
        const service = makeLocalServices(['testDB', 'testDB1']);
        const testDB = service.service('testDB');
        const testDB1 = service.service('testDB1');   
        
        expect(testDB).toBeTruthy();
        expect(testDB).toHaveProperty('get');
        expect(testDB1).toBeTruthy();
        expect(testDB1).toHaveProperty('find');
    });
});