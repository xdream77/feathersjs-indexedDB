/**
 * 
 * Documentation:
 *  -> localforage: https://localforage.github.io/localForage/
 * 
 */

import localforage from 'localforage';

export default name => localforage.createInstance({ name: name || 'You are lost' });