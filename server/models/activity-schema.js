const mongoose = require('mongoose');

let activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        trim: true
    },
    time: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    activityTime: {
        type: Date,
        default: new Date()
    }
});

let Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;