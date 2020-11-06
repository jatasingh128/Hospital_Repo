const mongoose = require('mongoose');

const dutyTimingsSchema = new mongoose.Schema({
    text: {
        type: String
    }
});

let DutyTimingsData = mongoose.model('DutyTimingsData', dutyTimingsSchema, 'dutyTimings');

module.exports = DutyTimingsData;