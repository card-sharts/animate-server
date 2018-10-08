const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/required-types');

const schema = new Schema({
    essayId: {
        type: Schema.Types.ObjectId,
        ref: 'Essay',
        required: true
    },
    caption: String,
    photoUrl: RequiredString
});

module.exports = mongoose.model('Photo', schema);