import { makeLocalServices } from './lib/indexed-db/index.js';

const local = makeLocalServices(['messages', 'users']);
//console.log(local[0]);

/* local.service('messages')
    .remove(null, { query: { name: 'Kotthaus' } })
    .then(console.log); */

/* local.service('messages')
    .update('iEfclxSyctAw9-J4ORfrF', {hello: 'Andre', name: 'Kotthaus', details: { age: 44, color: 'white' }})
    .then(console.log); */

local.service('messages')
    .find({ query: {$limit: 2, $skip: 3,  $select: ['hello', 'name'], hello: {$in: ['Andre', 'Thomas']} }})
    .then(console.log);

/* local.service('messages')
    .get('iEfclxSyctAw9-J4ORfrF', {$select: ['details']})
    .then(console.log);
 */
/* local.service('messages')
    .create([
        {hello: 'Andre', name: 'Kotthaus', details: { age: 44, color: 'white' }},
        //{hello: 'Thomas', name: 'Hack', details: { age: 45, color: 'white' }},
        //{hello: 'Markus', name: 'Sommerfeld', details: { age: 41, color: 'black' }}
    ])
    .then(console.log); */

/* local.service('users')
    .patch('GIjDvniBd4rZGywgESjy-', { name: 'PATCHED', details: { color: 'red', box: 'bordee' }})
    .then(console.log); */
