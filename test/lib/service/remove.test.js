import { cleanup, fill } from './../../test-database.js';
import service from './../../../lib/service.js';

describe('service', () => {

    it('removes a single value by ID', (done) => {
        expect.assertions(2);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.remove('awesome-3')
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            total: 0,
                            limit: 0,
                            skip : 0,
                            data : [ { id: 'awesome-3', first: 'andrew', last: 'stinson', age: 26 } ]
                        });

                        return obj;
                    })
                    .then(() => {
                        db.get('awesome-3')
                            .then(obj => {
                                expect(obj).toStrictEqual({ id: 'awesome-3' });
                                cleanup(db).then(() => done());
                            });
                    })
                    .catch(done);

            })
            .catch(done);
    });

    it('removes multiple objects by matchers in query', (done) => {
        expect.assertions(2);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.remove(false, 
                    { query: { id: { $in: [ 'awesome-3', 'awesome-5' ] } } }
                )
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            total: 2,
                            limit: 0,
                            skip : 0,
                            data : [ 
                                { id: 'awesome-3', first: 'andrew', last: 'stinson', age: 26 },
                                { id: 'awesome-5', first: 'tim', last: 'miller', age: 55 }
                            ]
                        });

                        return obj;
                    })
                    .then(() => {
                        db.find()
                            .then(obj => {
                                expect(obj).toStrictEqual({
                                    total: 4,
                                    limit: 0,
                                    skip : 0,
                                    data : [
                                        { id: 'awesome-0', first: 'bob', last: 'smith', age: 33 },
                                        { id: 'awesome-1', first: 'anna', last: 'hope', age: 34 },
                                        { id: 'awesome-2', first: 'john', last: 'miller', age: 33 },
                                        { id: 'awesome-4', first: 'marc', last: 'winger', age: 69 }
                                    ]
                                });
                                cleanup(db).then(() => done());
                            })
                            .catch(done);
                    })
                    .catch(done);

            })
            .catch(done);
    });
});