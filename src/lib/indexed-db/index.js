import { curry } from 'ramda';
import createService from './service.js';

export default curry((name, app) => {
    const options = {
        name,
    };
    app.use(name, createService(options));
});
