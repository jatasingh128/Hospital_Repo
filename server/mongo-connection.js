const mongoose = require('mongoose');
const config = require('./config');
// let mongoUrl = 'mongodb://' + config.mongoServer.host + ":" + config.mongoServer.port + "/" + config.mongoServer.dbName;
let mongoUrl = 'mongodb+srv://HospitalData:12HospitalData@cluster0.hp9kj.mongodb.net/Appointment';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});