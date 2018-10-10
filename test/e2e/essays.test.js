const { assert } = require('chai');
const { request, checkOk } = require('./request');
const { dropCollection } = require('./_db');
const { testSubmission1, testSubmission2 } = require('./test-data');

let essay1, essay2, photos1;

describe('Essays API', () => {
    beforeEach(() => dropCollection('essays'));
    beforeEach(() => dropCollection('photos'));
    beforeEach(() => dropCollection('references'));

    beforeEach(() => {
        return request
            .post('/api/essays')
            .send(testSubmission1)
            .then(checkOk)
            .then(({ body }) => {
                assert.isDefined(body.photos);
                assert.isDefined(body.references);
                assert.equal(body.photos.length, 1);
                essay1 = body.essay;
                photos1 = body.photos;
            });
    });
    
    beforeEach(() => {
        return request
            .post('/api/essays')
            .send(testSubmission2)
            .then(checkOk)
            .then(({ body }) => {
                assert.isDefined(body.photos);
                assert.isUndefined(body.references);
                assert.equal(body.photos.length, 2);
                essay2 = body.essay;
            });
    });
    
    it('can post an essay', () => {
        assert.isOk(essay1);
        assert.isNotOk(essay1.photos);
        assert.isOk(essay2);
        assert.isNotOk(essay2.photos);
    });

    it('gets an array on for a get all', () => {
        return request
            .get('/api/essays')
            .then(checkOk)
            .then(({ body }) => {
                assert.isArray(body);
            });
    });

    it('brings back all items on a get all', () => {
        return request
            .get('/api/essays')
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.length, 2);
                assert.isDefined(body[0]._id);
                assert.isDefined(body[1]._id);
            });
    });

    it('brings back the right items on get all', () => {
        return request
            .get('/api/essays')
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body[0].title, 'My Wedding');
                assert.equal(body[0].tags.length, 2);
                assert.equal(body[1].title, 'BEST WEDDING');
                assert.equal(body[1].tags.length, 1);
            });
    });

    it('gets a single essay and the associated photos/refs', () => {
        return request
            .get(`/api/essays/${essay1._id}`)
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.q4, essay1.q4);
                assert.deepEqual(body.photos, photos1);
            });
    });
});