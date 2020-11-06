const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
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
        required: true,
    },
    DepartmentName: {
        type: String,
        required: true,
    },
    DepartmentId: {
        type: String,
        required: true,
    },
    Symptoms: {
        type: String,
        required: true,
    },
    PatientId: {
        type: String,
        required: true
    },
    DoctorId: {
        type: String,
        required: true
    }
});

const Hospital = mongoose.model('Hospital', hospitalSchema, 'hospitalData');

module.exports = Hospital;