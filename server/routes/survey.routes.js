
const express = require('express');
const surveyCtrl = require('../controller/survey.controller');

const router = express.Router()

module.exports = router;

router.post('/add-question', surveyCtrl.addQuestion)

router.get('/get-questions', surveyCtrl.getQuestions)

router.post('/survey-response', surveyCtrl.addSurveyResponse)