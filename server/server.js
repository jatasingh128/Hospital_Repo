const express = require('express');
// import express from 'express';
const app = express();
const config = require('./config');
require('./mongo-connection');
const patient = require('./patients/patient');
const activity = require('./activity/activity');
const common = require('./common');
const doctor = require('./doctors/doctor');
const workday = require('./doctors/work-day');
const cors = require('cors');

app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(express.json());
app.use('/api', common);
app.use('/api/patient', patient);
app.use('/api/activity', activity);
app.use('/api/doctor', doctor);
app.use('/api/workday', workday);

// app.post('/api/experience', async (req, res) => {
//     let data = new Common.expModel(req.body);
//     await data.save();
//     try {
//         res.send(data)
//     }
//     catch (err) {
//         res.status(400).send(err);
//     }
// })

app.listen(config.port, () => {
    console.log(`server is listening at http://localhost:${config.port}`)
})