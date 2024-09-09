const { default: mongoose } = require("mongoose");


const customSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['rating', 'text']
    },
    scale: {
        type: Number,
        required: false,
    }
})

const Questions = mongoose.model('Question', customSchema)

module.exports = Questions