const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: new Date, required: false }
});

module.exports = mongoose.model('exercises', ExerciseSchema);