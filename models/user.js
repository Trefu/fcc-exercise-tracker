const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    exercises: { type: Array, default: [] }
});

module.exports = mongoose.model('users', UserSchema);