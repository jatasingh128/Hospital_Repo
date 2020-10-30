const mongoose = require('mongoose');
const config = require('./config');
let mongoUrl = 'mongodb://' + config.mongoServer.host + ":" + config.mongoServer.port + "/" + config.mongoServer.dbName;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});