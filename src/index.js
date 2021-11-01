import feathers from '@feathersjs/feathers';
import service from './lib/indexed-db/index.js';
const local = feathers();

local.configure(service('messages'));

/* local.service('messages')
    .remove(null, { query: { name: 'Kotthaus' } })
    .then(console.log); */

/* local.service('messages')
    .update('iEfclxSyctAw9-J4ORfrF', {hello: 'Andre', name: 'Kotthaus', details: { age: 44, color: 'white' }})
    .then(console.log); */


/* local.service('messages')
    .find({ query: {hello: 'Andre', name: 'Kotthaus', details: { age: 44, color: 'white' }}})
    .then(console.log); */

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

local.service('messages')
    .patch('GIjDvniBd4rZGywgESjy-', { name: 'PATCHED', details: { color: 'red', box: 'bordee' }})
    .then(console.log);
