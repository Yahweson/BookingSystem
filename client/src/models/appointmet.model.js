const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    status:{
        type:String,
        minlength:1
    },
    symptoms:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    time:{
        type:String,
        trim:true,
        minlength:3
    },
    date:{
        type:String,
        trim:true,
        minlength:3
        
    },
    patientId:{
        type:String,
        trim:true,
        minlength:3
    }

}, {
    timestamps:true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;