const mongoose = require('mongoose');
const shortId = require('shortid')
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    nameAccount:{
        type: String,
        default: "Test1"

    },
    role:
    {
        type: String,
        enum: ['ADMIN','STUDENT','TEACHER'],
        default:'STUDENT',
    },
    createAt:{
        type: Date,
        default: Date.now,
    },
    code:{
        type: String,
    }
})


module.exports = mongoose.model('User',userSchema);
