const { assert } = require('chai');
const { request, checkOk } = require('./request');
const { dropCollection } = require('./_db');

describe('Essays API', () => {
    
    beforeEach(() => dropCollection('essays'));
    beforeEach(() => dropCollection('photos'));

    const testEssay1 = {
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

    const testEssay2 = {
        title: 'BEST WEDDING',
        q1: 'I only shoot the best of the best.',
        q2: 'Beautiful dresses make me happy.',
        q3: 'Having to not drink at the open bar.',
        q4: 'Every wedding is a great success.',
        bangerUrl: 'https://res.cloudinary.com/dkbja8aak/image/upload/v1537564524/ajcjc8itv9z7rogs4r3j.jpg',
        tags: ['jewish'],
        publishDate: '18-10-12',
        photos: [
            {
                photoUrl: 'https://res.cloudinary.com/dkbja8aak/image/upload/v1537564524/ajcjc8itv9z7rogs4r3j.jpg'
            },
            {
                photoUrl: 'https://res.cloudinary.com/dkbja8aak/image/upload/v1537564524/ajrerr34v9z7rogs4r3j.jpg'
            }
        ]
    };

    let essay1, essay2;

    beforeEach(() => {
        return request
            .post('/api/essays')
            .send(testEssay1)
            .then(checkOk)
            .then(({ body }) => {
                assert.isDefined(body.photos);
                assert.equal(body.photos.length, 1);
                essay1 = body.essay;
            });
    });
    beforeEach(() => {
        return request
            .post('/api/essays')
            .send(testEssay2)
            .then(checkOk)
            .then(({ body }) => {
                assert.isDefined(body.photos);
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
});