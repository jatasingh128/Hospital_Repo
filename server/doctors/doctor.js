const express = require('express');
const router = express.Router();
let Doctor = require('../models/doctor-schema');
const multer = require('multer');

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

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './doctors_img');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).array('myFile', 2);

router.post('/profile/images', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.json({ 'message': 'File uploaded' });
    });
});

module.exports = router;