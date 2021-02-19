const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({

    
    email:{
        type:String,
        required:true,
        minlength:3
    },

    firstName:{
        type:String,
        required:true,
        minlength:3
    },
    lastName: {
        type:String,
        required:true,
        minlength:3   
    }
    ,
    password:{
        type: String,
        required: true,
        minlength:3
    },

}, {
    timestamps:true,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;