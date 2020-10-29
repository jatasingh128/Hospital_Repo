
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    text: {
        type: String
    },
    dob: {
        type: Date
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    disease: {
        type: String
    },
    departmentName: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    gender: {
        type: String
    },
    symptoms: {
        type: String
    }
})

const Patients = mongoose.model('Patients', patientSchema);

module.exports = Patients;
