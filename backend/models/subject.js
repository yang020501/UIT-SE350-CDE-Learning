const mongoose = require('mongoose');
const shortId = require('short-id')
const subjectSchema = new mongoose.Schema({
    subjectName:{
        type: String,
        required: true,
        unique: true,
    },
})


module.exports = mongoose.model('Subject',subjectSchema);
