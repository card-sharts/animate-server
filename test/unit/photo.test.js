const { assert } = require('chai');
const { Types } = require('mongoose');
const Photo = require('../../lib/models/photo');

describe('Photo model', () => {
    it('validates good model', () => {
        const data = {
            essayId: Types.ObjectId(),
            caption: 'Coolest photo ever',
            photoUrl: 'https://res.cloudinary.com/dkbja8aak/image/upload/v1537564489/ii2icezuxx9xqfnnnmnv.jpg'
        };

        const photo = new Photo(data);
        const json = photo.toJSON();
        delete json._id;

        assert.deepEqual(json, data);
    });
});