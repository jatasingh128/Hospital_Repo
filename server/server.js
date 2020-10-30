const express = require('express');
const app = express();
const config = require('./config');
const path = require('path');
require('./mongo-connection');
const patient = require('./patients/patient-server');
const activity = require('./activity/activity');
const commonSchema = require('./models/common-schema');
app.use(express.json());

app.use('/api/patient', patient);
app.use('/api/activity', activity);

app.get('/api', (req, res) => {
    res.send('Hello World!')
});

app.get('/api/experience', async (req, res) => {
    let data = await commonSchema.expModel.find();
    res.send(data);
})

app.get('/api/dutyTiming', async (req, res) => {
    let data = await commonSchema.dutyTimingsModel.find();
    res.send(data);
})

app.get('/api/clientConfig', (req, res) => {
    res.sendFile(path.join(__dirname + '/clientConfig.js'));
})

app.listen(config.port, () => {
    console.log(`server is listening at http://localhost:${config.port}`)
})