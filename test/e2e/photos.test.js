const { assert } = require('chai');
const { request, check400 } = require('./request');
// const { dropCollection } = require('./_db');

describe('Photos API', () => {

    it('receives a 400 if there are no photos attached', () => {
        return request
            .post('/api/essays')
            .send({
                title: 'BEST WEDDING',
                q1: 'I only shoot the best of the best.',
                q2: 'Beautiful dresses make me happy.',
                q3: 'Having to not drink at the open bar.',
                q4: 'Every wedding is a great success.',
                bangerUrl: 'https://res.cloudinary.com/dkbja8aak/image/upload/v1537564524/ajcjc8itv9z7rogs4r3j.jpg',
                tags: ['jewish'],
                publishDate: '18-10-12',
            })
            .then(check400)
            .then(({ body }) => {
                assert.isDefined(body.error);
                assert.equal(body.error, 'Photos are required.');
            });
    });
});