const express = require('express');
const router = express.Router();
let WorkDay = require('../models/workDays-schema');

router.get('/', async (req, res) => {
    const workDay = await WorkDay.find();
    await workDay.populate('workDays').execPopulate();
    res.send(workDay);
});

router.post('/', (req, res) => {
    let data = new WorkDay(req.body);
    data.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

router.put('/:id', async (req, res) => {
    try {
        const data = await WorkDay.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
        res.send(data);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await WorkDay.findByIdAndDelete(req.params.id);
        res.send('workDay deleted successfully');
    }
    catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router;