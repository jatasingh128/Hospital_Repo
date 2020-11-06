const express = require('express');
const router = express.Router();
let Doctor = require('../models/doctor-schema');

router.get('/', async (req, res) => {
    const doctors = await Doctor.find();
    await doctors.populate('workDays').execPopulate();
    res.send(doctors);
});

router.post('/', (req, res) => {
    let data = new Doctor(req.body);
    data.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

router.put('/:id', async (req, res) => {
    try {
        const data = await Doctor.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
        res.send(data);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.send('Doctor deleted successfully');
    }
    catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router;