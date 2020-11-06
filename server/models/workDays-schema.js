const mongoose = require('mongoose');

const workDaySchema = new mongoose.Schema({
    Day: {
        type: String,
        required: true
    },
    Index: {
        type: Number,
        required: true
    },
    Enable: {
        type: Boolean,
        required: true
    },
    WorkStartHour: {
        type: Date,
        required: true,
    },
    WorkEndHour: {
        type: Date,
        required: true,
    },
    BreakStartHour: {
        type: Date,
        required: true,
    },
    BreakEndHour: {
        type: Date,
        required: true,
    },
    State: {
        type: String,
        required: true,
        trim: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    }
});

const WorkDay = mongoose.model('WorkDay', workDaySchema, 'workDays');

module.exports = WorkDay;