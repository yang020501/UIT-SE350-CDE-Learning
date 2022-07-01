const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    phone:{
        type: String,
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    createAt:{
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.model('Contact',contactSchema);
