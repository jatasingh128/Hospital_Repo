
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    Text: {
        type: String
    },
    DOB: {
        type: Date
    },
    Mobile: {
        type: String
    },
    Email: {
        type: String
    },
    Address: {
        type: String
    },
    Disease: {
        type: String
    },
    DepartmentName: {
        type: String
    },
    BloodGroup: {
        type: String
    },
    Gender: {
        type: String
    },
    Symptoms: {
        type: String
    }
})

const Patients = mongoose.model('Patients', patientSchema);

module.exports = Patients;
