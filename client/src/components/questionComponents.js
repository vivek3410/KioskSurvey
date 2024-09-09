import { Star } from "lucide-react";
import Rating from "react-rating";

function QuestionComponent({ question, answer, handleAnswer }) {

    const handleChange = (value) => {
        handleAnswer(question._id, value)
    }
    return (
        <div className='flex flex-col gap-4 md:w-[40em]'>
            <h3 className='text-sm sm:text-lg md:text-xl'>{question.question}</h3>

            {question.type === 'text' ? (
                <input type='text' onChange={(e) => handleChange(e.target.value)} placeholder='Suggestion...' className='bg-transparent w-full border-b-[1px] border-black py-1 md:py-2 placeholder:text-slate-600 outline-none placeholder:text-xs' />
            ) : (
                <Rating
                    initialRating={answer}
                    onChange={handleChange}
                    emptySymbol={
                        <div className="mx-1 md:mx-2">
                            <Star className="text-gray-300 w-4 h-4 md:w-8 md:h-8" />
                        </div>
                    }
                    fullSymbol={
                        <div className="mx-1 md:mx-2">
                            <Star className="text-yellow-500 w-4 h-4 md:w-8 md:h-8" />
                        </div>
                    }
                    fractions={1}
                    stop={question.scale}
                />
            )}
        </div>
    );
}

export default QuestionComponent;
