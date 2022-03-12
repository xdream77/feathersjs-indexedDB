import { toEmptyResult, toArray, logErrorReturnEmpty, isArray, returnKeyValue } from './../../lib/util.js';



describe('util', () => {
    it('controlls if the given value is an Array', () => {
        expect.assertions(2);

        const happy = isArray(['hallo']);
        const sad = isArray('hallo');
        expect(happy).toBe(true);
        expect(sad).toBe(false);
    });
   
    it('returns an empty result if no result exist', () => {
        expect.assertions(1);

        const happy = toEmptyResult();
        expect(happy).toStrictEqual({
            total: 0,
            limit: 0,
            skip : 0,
            data : []
        });
    });
    it('returns an result if array is sent', () => {
        expect.assertions(1);
        const shouldNotHappen = toEmptyResult([{ dolphin: '!shark' }]);
        
        expect(shouldNotHappen).toStrictEqual({
            total: 0,
            limit: 0,
            skip : 0,
            data : [{ dolphin: '!shark' }]
        });
    });
    
    it('returns every Input as an Array', () => {
        expect.assertions(4);

        const object = toArray({ dolphin: '!shark' });
        const string = toArray('dontGoOnMyNerves');
        const number = toArray(1701);
        const array = toArray(['all fine']);
        
        expect(object).toStrictEqual([{ dolphin: '!shark' }]);
        expect(string).toStrictEqual(['dontGoOnMyNerves']);
        expect(number).toStrictEqual([1701]);
        expect(array).toStrictEqual(['all fine']);
    });
    
    it('merges id to value', () => {
        expect.assertions(1);

        const value = { hello: 'world', id: 'overwrite me' };
        const id = 'newId';
        const result = returnKeyValue(id, value);
        expect(result).toStrictEqual({
            hello: 'world',
            id   : 'newId'
        });
    });

    it('traces the error and returns an empty result', () => {
        expect.assertions(3);
        jest.spyOn(global.console, 'trace');
        const value = { hello: 'world', id: 'overwrite me' };
        
        const result = logErrorReturnEmpty(value);
        expect(result).toStrictEqual({
            total: 0,
            limit: 0,
            skip : 0,
            data : []
        });
        expect(console.trace.mock.calls.length).toBe(1);
        expect(console.trace.mock.calls[0][0]).toStrictEqual({ hello: 'world', id: 'overwrite me' });
    });
});