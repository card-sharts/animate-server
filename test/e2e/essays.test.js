const { assert } = require('chai');
const { request, checkOk } = require('./request');
const { dropCollection } = require('./_db');

describe('Essays API', () => {
    beforeEach(() => dropCollection('essays'));
    beforeEach(() => dropCollection('photos'));

    const testEssay = {
        title: 'My Wedding',
        q1: 'My approach to wedding photography is to get wicked sick photos.',
        q2: 'Context of this wedding is that these people love each other, which is wicked sick.',
        q3: 'The biggest challenge was getting wicked sick photos.',
        q4: 'My greatest success was getting some wicked sick photos.',
        bangerUrl: 'https://res.cloudinary.com/dkbja8aak/image/upload/v1537564524/ajcjc8itv9z7rogs4r3j.jpg',
        tags: ['black & white', 'same-sex'],
        publishDate: '18-10-08',
        photos: [
            {
                photoUrl: 'https://res.cloudinary.com/dkbja8aak/image/upload/v1537564524/ajcjc8itv9z7rogs4r3j.jpg'
            }
        ]
    };

    let essay1;

    beforeEach(() => {
        return request
            .post('/api/essays')
            .send(testEssay)
            .then(checkOk)
            .then(({ body }) => {
                essay1 = body.essay;
            });
    });
    
    it('can post an essay', () => {
        assert.isOk(essay1);
        assert.isNotOk(essay1.photos);
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