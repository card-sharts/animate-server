const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./_db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe('Essays API', () => {

    beforeEach(() => dropCollection('essays'));

    const testEssay = {
        title: 'My Wedding',
        q1: 'My approach to wedding photography is to get wicked sick photos.',
        q2: 'Context of this wedding is that these people love each other, which is wicked sick.',
        q3: 'The biggest challenge was getting wicked sick photos.',
        q4: 'My greatest success was getting some wicked sick photos.',
        bangerUrl: 'https://res.cloudinary.com/dkbja8aak/image/upload/v1537564524/ajcjc8itv9z7rogs4r3j.jpg',
        tags: ['black & white', 'same-sex'],
        publishDate: '18-10-08'
    };

    let essay1;

    beforeEach(() => {
        return request
            .post('/api/essays')
            .send(testEssay)
            .then(checkOk)
            .then(({ body }) => {
                essay1 = body;
            });
    });
    
    it('can post an essay', () => {
        assert.isOk(essay1);
    });

    it('gets an array on for a get all', () => {
        return request
            .get('/api/essays')
            .then(checkOk)
            .then(({ body }) => {
                assert.isArray(body);
            });
    });
});