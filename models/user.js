const mongoose = require('mongoose');
const Exercise = require('./exercise')
const { Schema } = mongoose;
const UserSchema = new Schema({
    username: String,
    log: { type: Array, default: [Exercise] }
});

module.exports = mongoose.model('users', UserSchema,);