const { default: mongoose } = require("mongoose");


const customSchema = new mongoose.Schema({
    session_id: {
        type: String,
        required: true,
        index: true,
    },
    answers: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            answer: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            }
        }
    ]
})

const SurveyResponse = mongoose.model('SurveyResponse', customSchema)

module.exports = SurveyResponse