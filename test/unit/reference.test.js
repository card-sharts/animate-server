const { assert } = require('chai');
const { Types } = require('mongoose');
const Reference = require('../../lib/models/reference');

describe('Reference model', () => {
    it('validates good model', () => {
        const data = {
            essayId: Types.ObjectId(),
            category: 'Caterer',
        };

        const reference = new Reference(data);
        const json = reference.toJSON();
        delete json._id;

        assert.deepEqual(json, data);
    });
});