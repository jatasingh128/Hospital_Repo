const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor-schema');
const workdayServer = require('./work-day');
let WorkDay = require('../models/workDays-schema');
const multer = require('multer');


router.get('/', async (req, res) => {
    const doctors = await Doctor.find().populate('WorkDays').lean().exec();
    res.send(doctors);
});

router.post('/', async (req, res) => {
    let data = new Doctor(req.body);

    let result = await data.save();
    let workData = req.body.WorkDays;
    workData.map(e => {
        e['doctorId'] = result._id;
        return e;
    });
    await WorkDay.insertMany(workData);
    try {
        res.send(result);
    }
    catch (e) {
        res.status(400).send(e);
    }
    // data.save().then((result) => {
    //     workdays.save().then(() => {
    //         res.send(result);
    //     })
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })
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