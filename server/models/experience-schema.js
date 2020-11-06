const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    text: {
        type: String
    }
});

let Experience = mongoose.model('Experience', experienceSchema, 'experienceData');

module.exports = Experience;