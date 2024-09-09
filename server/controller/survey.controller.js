const Joi = require("joi");
const Questions = require("../models/questions.model");
const { default: mongoose } = require("mongoose");
const SurveyResponse = require("../models/survey_response.model");


const surveyCtrl = {
    addQuestion,
    addSurveyResponse,
    getQuestions
}
module.exports = surveyCtrl

const addQuestionSchema = Joi.object({
    question: Joi.string().required(),
    type: Joi.string().required(),
    scale: Joi.number().optional().allow(null)
})

const addSurveyResponseSchema = Joi.object({
    session_id: Joi.string().required(),
    answers: Joi.array().items(
        Joi.object({
            question: Joi.string().required(),
            answer: Joi.any().required()
        })
    ).required()
})

async function addQuestion(req, res) {
    try {
        const { error } = addQuestionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        await new Questions(req.body).save();

        return res.status(201).json({ message: "Question added successfully." })
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error", error: e })
    }
}

async function getQuestions(req, res) {
    try {
        const data = await Questions.find();

        return res.status(200).json({ data, message: "Retrieved successfully" })
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error", error: e })
    }
}

async function addSurveyResponse(req, res) {
    try {
        const { error } = addSurveyResponseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message, data: false })
        }

        const { answers, session_id } = req.body;

        // if (!mongoose.Types.ObjectId.isValid(question)) {
        //     return res.status(400).json({ message: "invalid question id" })
        // }

        let surveyResponse = await SurveyResponse.findOne({ session_id })

        if (surveyResponse) {
            surveyResponse.answers = answers.map(({ question, answer }) => ({
                question,
                answer
            }))

            await surveyResponse.save()
        } else {
            surveyResponse = new SurveyResponse({
                session_id,
                answers: answers.map(({ question, answer }) => ({
                    question,
                    answer
                }))
            })

            await surveyResponse.save()
        }

        return res.status(200).json({ message: 'Survey saved successfully', data: true })
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error", error: e })
    }
}