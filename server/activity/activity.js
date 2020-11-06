const express = require('express');
const router = express.Router();
let Activity = require('../models/activity-schema');

router.get('/', async (req, res) => {
    const activity = await Activity.find();
    res.send(activity);
});

router.post('/', (req, res) => {
    let activityData = new Activity(req.body);
    activityData.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

module.exports = router;