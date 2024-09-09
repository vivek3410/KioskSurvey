import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CountDown() {
    const [timeLeft, setTimeLeft] = useState(5);
    const navigate = useNavigate()
    useEffect(() => {
        if (timeLeft === 0) {
            navigate('/')
            return;
        }

        const timeId = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timeId)
    }, [timeLeft, navigate])

    return (
        <div>
            <h1>You will redirect to the welcome page in {timeLeft}</h1>
        </div>
    );
}

export default CountDown;
