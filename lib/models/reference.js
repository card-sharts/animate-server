const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    essayId: {
        type: Schema.Types.ObjectId,
        ref: 'Essay',
        required: true
    },
    category: {
        type: String,
        enum: ['Venue', 'Planner/coordinator', 'Florist', 'Caterer', 'DJ', 'Entertainment', 'Hair', 'Makeup', 'Officiant', 'Other']
    },
    websiteUrl: String,
    instagram: String
});

module.exports = mongoose.model('Reference', schema);