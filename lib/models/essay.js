const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const { Schema } = mongoose;
const { RequiredString } = require('../util/required-types');

const schema = new Schema({
    title: RequiredString,
    q1: RequiredString,
    q2: RequiredString,
    q3: RequiredString,
    q4: RequiredString,
    tags: {
        type: [String],
        enum: ['black & white', 'same-sex', 'african-american', 'christian', 'muslim', 'jewish', 'hindu']
    },
    featuredPhotoUrl: RequiredString,
    publishDate: String
});

schema.statics.essayById = function(id) {
    return this.aggregate([
        { $match: { _id: ObjectId(id) } },
        { $lookup: {
            from: 'photos',
            localField: '_id',
            foreignField: 'essayId',
            as: 'photos'
        } },
        { $lookup: {
            from: 'references',
            localField: '_id',
            foreignField: 'essayId',
            as: 'references'
        } }
    ]);
};

module.exports = mongoose.model('Essay', schema);