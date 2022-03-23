import { cleanup, fill } from './../../test-database.js';
import service from './../../../lib/service.js';

describe('service-update', () => {

    it('updates a single value by id and returns a an feathers conform answer with the updated value', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.update('awesome-3', { test: 'update' })
                    .then(data => {
                        expect(data).toStrictEqual({
                            limit: 0,
                            skip : 0,
                            total: 1,
                            data : [  { id: 'awesome-3', test: 'update' } ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('updates multiple values according to query and returns a an Array with the updated values', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.update(null, { last: 'Johnson', first: 'Joe', completely: 'new' }, { query: { last: 'miller' } })
                    .then(data => {
                        expect(data).toStrictEqual({
                            limit: 0,
                            skip : 0,
                            total: 2,
                            data : [ 
                                { last: 'Johnson', first: 'Joe', completely: 'new', id: 'awesome-2' },
                                { last: 'Johnson', first: 'Joe', completely: 'new', id: 'awesome-5' } 
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('performs an "upsert" when no item is found with this id, and returns an Array with the created value', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.update('asdf', { last: 'Johnson', first: 'Joe', completely: 'new' })
                    .then(data => {
                        db.get('asdf')
                            .then(result => {
                                expect(result.id).toBe(data.data[0].id);
                                cleanup(db).then(() => done());
                            });
                    })
                    .catch(done);
            })
            .catch(done);
    });
});