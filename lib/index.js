import feathers from '@feathersjs/feathers';
import createService from './service.js';
const local = feathers();

export const makeLocalService = name => (local.use(name, createService({ name })), local);

export const makeLocalServices = names => (names.map(makeLocalService), local);