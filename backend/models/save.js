const mongoose = require('mongoose');
const saveSchema = new mongoose.Schema({
    lessonId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Lesson',
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    }
})


module.exports = mongoose.model('Save',saveSchema);
