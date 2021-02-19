const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientInfoSchema = new Schema({
    idNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },

    gender:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    condition:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    cell:{
        type:Number,
        required:true,
        unique:true,
        trim:true,
        minlength:10
    },
    workNumber: {
        type:Number,
        required:true,
        unique:true,
        trim:true,
        minlength:13   
    },
    address:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        minlength:3
    },
    patientId:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        minlength:3
    }
}, {
    timestamps:true,
});

const PatientInfo = mongoose.model('PatientInfo', patientInfoSchema);

module.exports = PatientInfo;