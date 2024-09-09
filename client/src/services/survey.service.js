import axios from 'axios'

const url = process.env.BACKEND_URL
console.log(url);
const addSurveyResponse = async (payload) => {
    try {
        const res = await axios.post(`http://localhost:5000/api/survey/survey-response`, payload);
        return res.data;
    } catch (e) {
        console.log(e);
        throw Error(e)
    }
}

const getSurveyQuestions = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/api/survey/get-questions`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw Error(e)
    }
}



const surveyService = {
    addSurveyResponse,
    getSurveyQuestions
}

export default surveyService