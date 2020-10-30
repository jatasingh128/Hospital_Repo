const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.json()); 
var cors=require('cors');
require('./mongo-connection');
// app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
const patient = require('./patients/patient-server');
app.use('/api/patient', patient);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`)
})
