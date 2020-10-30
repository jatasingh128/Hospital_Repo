const express = require('express');
const router = express.Router();
const patientModel = require('../models/patient-schema');

router.get('/', async (req, res) => {
    const patient = await patientModel.find();
    res.send(patient);
})

router.post('/', (req, res) => {
    console.log(req.body, 'patient detailsssssssssss');
    const patient = new patientModel(req.body);
    patient.save().then(() => {
        res.send(patient);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

module.exports = router;
