const express = require('express');
const router = express.Router();
const Patient = require('../models/patient-schema');

router.get('/', async (req, res) => {
    const patient = await Patient.find();
    res.send(patient);
})

router.post('/', async (req, res) => {
    const patient = new Patient(req.body);
    patient.save().then(() => {
        res.send(patient);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

router.put('/:id', async (req, res) => {
    try {
        const data = await Patient.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
        res.send(data);
    }
    catch (e) {
        console.log(e,'error.................')
        res.status(400).send(e);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.send({message:'Patient deleted successfully'});
    }
    catch (e) {
        console.log(e,'error.................')
        res.status(400).send(e);
    }
})

module.exports = router;
