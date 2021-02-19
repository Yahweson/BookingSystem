const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minlength:3
    }
}, {
    timestamps:true,
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;