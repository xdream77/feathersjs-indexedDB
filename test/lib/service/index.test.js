import service from './../../../lib/service.js';

describe('service', () => {
    it('creates a service and returns the methods', () => {
        expect.assertions(7);

        const db = service({ name: 'test-db' });
        expect(db).toBeTruthy();
        expect(db).toHaveProperty('get');
        expect(db).toHaveProperty('find');
        expect(db).toHaveProperty('update');
        expect(db).toHaveProperty('patch');
        expect(db).toHaveProperty('create');
        expect(db).toHaveProperty('remove');
    });
});