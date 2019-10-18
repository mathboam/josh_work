const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    studentID:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    hall:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true
    }
});

const User = mongoose.model('User' , StudentSchema);

module.exports = User;