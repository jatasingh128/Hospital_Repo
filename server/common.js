const express = require('express');
const router = express.Router();
const path = require('path');
const Experience = require('./models/experience-schema');
const DutyTimings = require('./models/duty-timings-schema');
const Hospital = require('./models/hospital-schema');
const WaitingList = require('./models/waitingList-schema');

router.get('/experience', async (req, res) => {
    let data = await Experience.find();
    try {
        res.send(data);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

router.get('/dutyTiming', async (req, res) => {
    let data = await DutyTimings.find();
    try {
        res.send(data);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.get('/hospital', async (req, res) => {
    let data = await Hospital.find();
    try {
        res.send(data);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.get('/waitinglist', async (req, res) => {
    let data = await WaitingList.find();
    try {
        res.send(data);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.get('/clientConfig', (req, res) => {
    res.sendFile(path.join(__dirname + '/clientConfig.js'));
})

module.exports = router;