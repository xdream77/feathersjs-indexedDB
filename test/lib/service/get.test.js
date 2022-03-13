import { cleanup, fill } from './../../test-database.js';
import service from './../../../lib/service.js';

describe('service', () => {

    it('gets a single value by ID', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.get('awesome-3')
                    .then(obj => {
                        expect(obj).toStrictEqual({ id: 'awesome-3', first: 'andrew', last: 'stinson', age: 26 });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);

            })
            .catch(done);
    });

    it('gets a single value by ID and only selects lastname', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.get('awesome-4', { query: { $select: ['last'] } })
                    .then(obj => {
                        expect(obj).toStrictEqual({ last: 'winger' });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('gets a single value by ID and only selects lastname, since "address" is not in Object', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.get('awesome-4', { query: { $select: ['last', 'address'] } })
                    .then(obj => {
                        expect(obj).toStrictEqual({ last: 'winger' });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('gets a single value by ID and returns an empty Object, when selector is not in Object', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.get('awesome-4', { query: { $select: ['address'] } })
                    .then(obj => {
                        expect(obj).toStrictEqual({});
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('gets a single value by ID and returns entire Object, when $select is invalid type', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.get('awesome-3', { query: { $select: {hello: 'world'} } })
                    .then(obj => {
                        expect(obj).toStrictEqual({ id: 'awesome-3', first: 'andrew', last: 'stinson', age: 26 });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('returns a single value with only the ID, if the ID is unknown', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.get('awesome-39')
                    .then(obj => {
                        expect(obj).toStrictEqual({ id: 'awesome-39' });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);

            })
            .catch(done);
    });

});