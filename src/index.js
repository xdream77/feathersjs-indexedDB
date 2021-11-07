import { makeLocalServices } from './lib/index.js';

const local = makeLocalServices(['messages', 'users']);
//console.log(local[0]);

/* local.service('messages')
    .remove(null, { query: { name: 'Kotthaus' } })
    .then(console.log); */

/* local.service('messages')
    .update('iEfclxSyctAw9-J4ORfrF', {hello: 'Andre', name: 'Kotthaus', details: { age: 44, color: 'white' }})
    .then(console.log); */

local.service('messages')
    .find({ query: {$limit: 3, $select: [], $skip: 1, hello: {$in: ['Thomas', 'Andre']} }})
    .then(console.log);

/* local.service('messages')
    .get('ZaIBf', {$select: ['details', 'id']})
    .then(console.log); */

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


/* local.service('messages')
    .patch(null, { name: 'PATTY', details: { color: 'red', box: 'bordee' }}, { query: {$limit: 3, $skip: 1, hello: {$in: ['Thomas', 'Andre']} }});
    
local.service('messages').on('patched', (data) => {
    console.log('Patched Data: ', data);
}); */


