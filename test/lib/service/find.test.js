import { cleanup, fill } from './../../test-database.js';
import service from './../../../lib/service.js';

describe('service-find', () => {

    it('gets a single value by query and returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { id: 'awesome-3' } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            limit: 0,
                            skip : 0,
                            total: 1,
                            data : [
                                { id: 'awesome-3', first: 'andrew', last: 'stinson', age: 26 }
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('gets all objects, where lastname is "miller" returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { last: 'miller' } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            limit: 0,
                            skip : 0,
                            total: 2,
                            data : [
                                { id: 'awesome-2', first: 'john', last: 'miller', age: 33 },
                                { id: 'awesome-5', first: 'tim', last: 'miller', age: 55 }
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('gets all objects, where age is 34 or 69 and returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { age: { $in: [34, 69] } } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            limit: 0,
                            skip : 0,
                            total: 2,
                            data : [
                                { id: 'awesome-1', first: 'anna', last: 'hope', age: 34 },
                                { id: 'awesome-4', first: 'marc', last: 'winger', age: 69 }
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('gets all objects, where age is NOT 34 or 69 and returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { age: { $nin: [34, 69] }, $select: ['age', 'first'] } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            limit: 0,
                            skip : 0,
                            total: 4,
                            data : [
                                { age: 33, first: 'bob' },
                                { age: 33, first: 'john' },
                                { age: 26, first: 'andrew' },
                                { age: 55, first: 'tim' }
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('gets first two objects, where age is NOT 34 or 69 and returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { age: { $nin: [34, 69] }, $select: ['age', 'first'], $limit: 2 } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            limit: 2,
                            skip : 0,
                            total: 4,
                            data : [
                                { age: 33, first: 'bob' },
                                { age: 33, first: 'john' },
                                
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('skips first two objects, where age is NOT 34 or 69 and returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { age: { $nin: [34, 69] }, $select: ['age', 'first'], $limit: 2, $skip: 2 } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            limit: 2,
                            skip : 2,
                            total: 4,
                            data : [
                                { age: 26, first: 'andrew' },
                                { age: 55, first: 'tim' }
                                
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('sorts objects firstname alphabetical, where age is NOT 33 or 69 and returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { age: { $nin: [33, 69] }, $select: ['age', 'first', 'last'], $sort: { first: 1 }, $limit: 2 } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            total: 3,
                            limit: 2,
                            skip : 0,
                            data : [
                                { age: 26, first: 'andrew', last: 'stinson' },
                                { age: 34, first: 'anna', last: 'hope' }
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('return objects where age is greater than 33 and lower than 55 and returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { age: { $gt: 33, $lt: 55 }, $select: ['age', 'first', 'last'] } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            total: 1,
                            limit: 0,
                            skip : 0,
                            data : [
                                { age: 34, first: 'anna', last: 'hope' }
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('return objects where age is greaterEqual to 33 and lowerequal than 55 and returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { age: { $gte: 33, $lte: 55 }, $select: ['age', 'first', 'last'] } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            total: 4,
                            limit: 0,
                            skip : 0,
                            data : [
                                { age: 33, first: 'bob', last: 'smith' },
                                { age: 34, first: 'anna', last: 'hope' },
                                { age: 33, first: 'john', last: 'miller' },
                                { age: 55, first: 'tim', last: 'miller' }
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('return objects where age is NOT 33 and returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { age: { $ne: 33 }, $select: ['age', 'first', 'last'] } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            total: 4,
                            limit: 0,
                            skip : 0,
                            data : [
                                { age: 34, first: 'anna', last: 'hope' },
                                { age: 26, first: 'andrew', last: 'stinson' },
                                { age: 69, first: 'marc', last: 'winger' },
                                { age: 55, first: 'tim', last: 'miller' }
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('return objects where age is NOT 33 and returns a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { $or: [
                    { age: 34 },
                    { first: 'marc' }
                ], $select: ['age', 'first', 'last'] } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            total: 2,
                            limit: 0,
                            skip : 0,
                            data : [
                                { age: 34, first: 'anna', last: 'hope' },
                                { age: 69, first: 'marc', last: 'winger' },
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('return all objects in a feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find()
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            total: 6,
                            limit: 0,
                            skip : 0,
                            data : [
                                { id: 'awesome-0', first: 'bob', last: 'smith', age: 33 },
                                { id: 'awesome-1', first: 'anna', last: 'hope', age: 34 },
                                { id: 'awesome-2', first: 'john', last: 'miller', age: 33 },
                                { id: 'awesome-3', first: 'andrew', last: 'stinson', age: 26 },
                                { id: 'awesome-4', first: 'marc', last: 'winger', age: 69 },
                                { id: 'awesome-5', first: 'tim', last: 'miller', age: 55 }
                            ]
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });

    it('returns empty feathers conform response', (done) => {
        expect.assertions(1);
        const name = 'test-db';
        const db = service(name);

        fill(db)
            .then(() => {
                db.find({ query: { lastname: 'Thomas' } })
                    .then(obj => {
                        expect(obj).toStrictEqual({
                            total: 0,
                            limit: 0,
                            skip : 0,
                            data : []
                        });
                        cleanup(db).then(() => done());
                    })
                    .catch(done);
            })
            .catch(done);
    });
});