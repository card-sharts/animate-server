const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/required-types');

const schema = new Schema({
    title: RequiredString,
    q1: RequiredString,
    q2: RequiredString,
    q3: RequiredString,
    q4: RequiredString,
    bangerUrl: RequiredString,
    publishDate: String
});

module.exports = mongoose.model('Essay', schema);