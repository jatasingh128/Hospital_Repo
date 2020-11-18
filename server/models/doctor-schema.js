const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Gender: {
        type: String,
        required: true,
        trim: true
    },
    Text: {
        type: String,
        required: true,
        trim: true
    },
    Color: {
        type: String,
        // required: true,
    },
    Education: {
        type: String,
        required: true,
    },
    DepartmentId: {
        type: String,
        required: true,
    },
    Designation: {
        type: String,
        required: true,
    },
    Specialization: {
        type: String,
        required: true
    },
    Experience: {
        type: String,
        required: true
    },
    DutyTiming: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Mobile: {
        type: String,
        required: true
    },
    Availability: {
        type: String,
        required: true
    },
    StartHour: {
        type: String,
        required: true
    },
    EndHour: {
        type: String,
        required: true
    },
    AvailableDays: {
        type: Array,
        required: true
    },
    doctorImage:{
        type: String,
        required: true
    }
});

doctorSchema.virtual('WorkDays', {
    ref: 'WorkDay',
    localField: '_id',
    foreignField: 'doctorId'
});

doctorSchema.set('toObject', { virtuals: true });
// doctorSchema.set('toJSON', { virtuals: true });

const Doctor = mongoose.model('Doctor', doctorSchema, 'doctors');

module.exports = Doctor;