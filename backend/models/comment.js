
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    lessonId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Lesson',
        required: true,        
    }, 
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,        
    },

    content:{
        type: String,
        required: true,
        
    },
    createAt:{
        type: Date,
        default: Date.now
    }
   
})

module.exports = mongoose.model('Comment',commentSchema);
