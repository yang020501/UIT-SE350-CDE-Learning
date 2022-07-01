const mongoose = require('mongoose');
const scoreDetail = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    lessonId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Lesson',
        required: true,
    },
    scoreTotal:{
        type: String,
    }
})


module.exports = mongoose.model('Score',scoreDetail);