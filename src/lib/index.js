import feathers from '@feathersjs/feathers';
import createService from './service.js';
const local = feathers();

const makeService = name => local.use(name, createService({ name }));

export const makeLocalServices = names => (names.map(makeService), local);