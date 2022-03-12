import cleanup from './../test-database.js';
import service from './../../lib/service.js';



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

    it('creates a value (without ID) in the indexed-db and returns the value', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);
        db.create({ hello: 'world', foo: 'bar' })
            .then(data =>{
                expect(data).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining(
                            { hello: 'world', foo: 'bar', id: expect.any(String) }   
                        )
                    ])
                );
                cleanup(db).then(() => done());
            })
            .catch(done);
    });

    it('creates a value (with ID) in the indexed-db and returns the value', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);
        db.create({ hello: 'world', foo: 'bar', id: 'awesome' })
            .then(data => {
                expect(data).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining(
                            { hello: 'world', foo: 'bar', id: 'awesome' }   
                        )
                    ])
                );
                cleanup(db).then(() => done());
            })
            .catch(done);
    });

    it('creates a value in the indexed-db  returns the value', (done) => {
        // expect.assertions(1);
        const db = service('test-db');
        db.find()
            .then(data =>{
                /* expect(data).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining(
                            { hello: 'world', foo: 'bar', id: expect.any(String) }   
                        )
                    ])
                ); */
                console.log(data);
                done();
            })
            .catch(done);
    });

});