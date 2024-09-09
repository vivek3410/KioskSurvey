import React from 'react';

function WelcomeScreen({ startSurvey }) {
    return (
        <div className='h-screen flex flex-col justify-center items-center gap-4 p-4'>
            <h1 className='text-black text-xl  sm:text-2xl md:text-4xl font-bold'>Welcome to our survey!</h1>
            <button onClick={startSurvey} className='bg-dark-blue px-[1em] py-[.5em] rounded-md text-white font-medium w-[8em] rounded-full'>Start</button>
        </div>
    );
}

export default WelcomeScreen;
