import cleanup from './../../test-database.js';
import service from './../../../lib/service.js';



describe('service', () => {

    it('creates a single value (without ID) in the indexed-db and returns the value', (done) => {
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

    it('creates a single value (with ID) in the indexed-db and returns the value', (done) => {
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

    it('creates multiple values (without ID) in the indexed-db  returns the value', (done) => {
        expect.assertions(1);
        const db = service('test-db');

        const values = [
            { hello: 'world', foo: 'bar' },
            { hello: 'world1', foo: 'bar1' },
            { hello: 'world2', foo: 'bar2' },
        ];

        db.create(values)
            .then(data => {
                expect(data).toEqual(
                    expect.arrayContaining([
                        { hello: 'world', foo: 'bar', id: expect.any(String)},   
                        { hello: 'world1', foo: 'bar1', id: expect.any(String)},   
                        { hello: 'world2', foo: 'bar2', id: expect.any(String)},   
                    ])
                );
                console.log(data);
                cleanup(db).then(() => done());
            })
            .catch(done);
    });
   
    it('creates multiple values (with ID) in the indexed-db  returns the value', (done) => {
        expect.assertions(1);
        const db = service('test-db');

        const values = [
            { hello: 'world', foo: 'bar', id: 'awesome'},
            { hello: 'world1', foo: 'bar1', id: 'awesome1'},
            { hello: 'world2', foo: 'bar2', id: 'awesome2'},
        ];

        db.create(values)
            .then(data => {
                expect(data).toEqual(
                    expect.arrayContaining([
                        { hello: 'world', foo: 'bar', id: 'awesome'},   
                        { hello: 'world1', foo: 'bar1', id: 'awesome1'},   
                        { hello: 'world2', foo: 'bar2', id: 'awesome2'} 
                    ])
                );
                cleanup(db).then(() => done());
            })
            .catch(done);
    });

});