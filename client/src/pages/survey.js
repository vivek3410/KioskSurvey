import React, { useEffect, useState } from 'react';
import QuestionComponent from '../components/questionComponents';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import surveyService from '../services/survey.service';
import ConfirmSubmissionModel from '../components/confirmModel';
import CountDown from '../components/countDownTimer';

function Survey({ sessionId }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    // handling the answers of the user
    const handleAnswer = (question, answer) => {
        setAnswers((prev) => {
            const existingAnswerIndex = prev.findIndex((a) => a.question === question);
            if (existingAnswerIndex !== -1) {
                const updatedAnswers = [...prev];
                updatedAnswers[existingAnswerIndex].answer = answer;
                return updatedAnswers;
            } else {
                return [...prev, { question, answer }];
            }
        });
    };

    // calling the  loadData function for one time
    useEffect(() => {
        loadData();
    }, []);

    // loading the question data from the backend server
    const loadData = async () => {
        try {
            let res = await surveyService.getSurveyQuestions();
            if (res.data) {
                setQuestions(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleConfirmationDialog = () => {
        setOpenConfirmationDialog(!openConfirmationDialog);
    };

    // Submission logic when user clicks on submit button
    const onSubmit = async () => {
        try {
            let payload = {
                session_id: sessionId,
                answers,
            };
            let res = await surveyService.addSurveyResponse(payload);

            if (res.data) {
                setIsFeedbackSubmitted(true)
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Handling next question logic
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    // Previous question logic
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    // get the current questioned answer
    const answer = answers.find((ans) => ans.question === currentQuestion?._id)?.answer;
    return (
        <div>
            {!isFeedbackSubmitted ? (
                <>
                    <div className='relative min-h-screen flex flex-col justify-center items-center gap-4 p-2'>
                        {/* Apply blur to the background when the confirmation dialog is open */}
                        <div className={`flex flex-col justify-center items-center gap-4 w-full transition-all duration-300 ${openConfirmationDialog ? 'blur-sm' : ''}`}>
                            <div className='flex gap-4'>
                                <div className='flex'>
                                    <span className='font-bold'>{currentQuestionIndex + 1}/{questions.length}</span>
                                    <ChevronRight />
                                </div>
                                {currentQuestion && <QuestionComponent question={currentQuestion} answer={answer} handleAnswer={handleAnswer} />}
                            </div>
                            {currentQuestionIndex === questions.length - 1 ? (
                                <div className='flex justify-around w-full'>
                                    <button
                                        onClick={handlePrev}
                                        disabled={currentQuestionIndex === 0}
                                        className={`bg-dark-blue px-[1em] py-[.5em] rounded-full md:w-[4em] flex justify-center text-white ${currentQuestionIndex === 0 ? 'opacity-40' : ''}`}
                                    >
                                        <ChevronLeft strokeWidth={2} />
                                    </button>
                                    <button
                                        onClick={handleConfirmationDialog}
                                        className={`bg-dark-blue px-[1em] py-[.5em] rounded-md md:w-[8em] flex justify-center text-white`}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentQuestionIndex === questions.length - 1}
                                        className={`bg-dark-blue px-[1em] py-[.5em] rounded-full md:w-[4em] flex justify-center text-white ${currentQuestionIndex === questions.length - 1 ? 'opacity-40' : ''}`}
                                    >
                                        <ChevronRight />
                                    </button>
                                </div>
                            ) : (
                                <div className='flex justify-around w-full'>
                                    <button
                                        onClick={handlePrev}
                                        disabled={currentQuestionIndex === 0}
                                        className={`bg-dark-blue px-[1em] py-[.5em] rounded-full md:w-[4em] flex justify-center text-white ${currentQuestionIndex === 0 ? 'opacity-40' : ''}`}
                                    >
                                        <ChevronLeft strokeWidth={2} />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentQuestionIndex === questions.length - 1}
                                        className={`bg-dark-blue px-[1em] py-[.5em] rounded-full md:w-[4em] flex justify-center text-white ${currentQuestionIndex === questions.length - 1 ? 'opacity-40' : ''}`}
                                    >
                                        <ChevronRight />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Confirmation dialog */}
                        {openConfirmationDialog && (
                            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                                <ConfirmSubmissionModel handleConfirmationDialog={handleConfirmationDialog} onSubmit={onSubmit} />
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className='flex flex-col items-center justify-center h-screen'>
                        <h1 className='text-2xl font-bold'>Thank you for your feedback</h1>
                        <CountDown />
                    </div>
                </>
            )}
        </div>
    );
}

export default Survey;
