const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/'

//mongoose.connect(
//    process.env.MONGODB_CONNECTION_STRING, {
//        useNewUrlParser: true, 
//        useCreateIndex: true, 
 //       useUnifiedTopology: true
//    },(err) => {
//        if(err) throw err;
//        console.log('MongoBD connection esatblished');
//});

//const connection = mongoose.connection;
//connection.once('open',() => {
//    console.log("MongoDb database connection established succesfully");
//});

mongoose.connect(mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then( () => console.log("MongoDB connected"))
    .catch( err => console.log(err));

const patientRouter = require('./client/src/routes/patients');
const appointmentRouter = require('./client/src/routes/appointment');
const personalInfoRouter = require('./client/src/routes/personalInfo');
const adminRouter = require('./client/src/routes/adminRoute');

app.use('/patients', patientRouter);
app.use('/patientInfo/', personalInfoRouter);
app.use('/appointment/', appointmentRouter);
app.use('/admin/', adminRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});