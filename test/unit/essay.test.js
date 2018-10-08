const { assert } = require('chai');
const Essay = require('../../lib/models/essay');

describe('Essay model', () => {
    it('validates good model', () => {
        const data = {
            title: 'My Wedding',
            q1: 'My approach to wedding photography is to get wicked sick photos.',
            q2: 'Context of this wedding is that these people love each other, which is wicked sick.',
            q3: 'The biggest challenge was getting wicked sick photos.',
            q4: 'My greatest success was getting some wicked sick photos.',
            bangerUrl: 'https://res.cloudinary.com/dkbja8aak/image/upload/v1537564524/ajcjc8itv9z7rogs4r3j.jpg',
            publishDate: '18-10-08'
        };

        const essay = new Essay(data);
        const json = essay.toJSON();
        delete json._id;

        assert.deepEqual(json, data);
    });
});