import makeStore from './../../lib/storage.js';

describe('storage', () => {
    it('makes a store Object with name', () => {
        expect.assertions(4);
        const db = makeStore('test-db');
        
        expect(db).toBeTruthy();
        expect(db).toHaveProperty('setItem');
        expect(db).toHaveProperty('getItem');
        expect(db).toHaveProperty('dropInstance');
    });
    
    it('makes a store Object without name', () => {
        expect.assertions(4);
        const db = makeStore();
        
        expect(db).toBeTruthy();
        expect(db).toHaveProperty('setItem');
        expect(db).toHaveProperty('getItem');
        expect(db).toHaveProperty('dropInstance');
    });
});