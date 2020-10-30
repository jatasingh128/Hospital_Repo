const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    text: {
        type: String
    }
});

let expModel = mongoose.model('ExperienceData', experienceSchema);

const dutyTimingsSchema = new mongoose.Schema({
    text: {
        type: String
    }
});

let dutyTimingsModel = mongoose.model('dutyTimingsData', dutyTimingsSchema);

module.exports = {
    expModel: expModel,
    dutyTimingsModel: dutyTimingsModel
}