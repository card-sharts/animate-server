const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const schema = new Schema ({
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

schema.methods = {
    generateHash(password) {
        this.hash = bcrypt.hashSync(password, 8);
    },
    comparePassword(password) {
        return bcrypt.compareSync(password, this.hash);
    }
};

module.exports = mongoose.model('Admin', schema);