const mongoose = require('mongoose');

const waitListSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    StartTime: {
        type: Date,
        required: true
    },
    EndTime: {
        type: Date,
        required: true
    },
    Disease: {
        type: String,
        required: true
    },
    DepartmentName: {
        type: String,
        required: true
    },
    Treatment: {
        type: String,
        required: true
    },
    DepartmentId: {
        type: String,
        required: true
    },
    PatientId: {
        type: String,
        required: true
    }
});

const WaitingList = mongoose.model('WaitingList', waitListSchema, 'waitingList');

module.exports = WaitingList;