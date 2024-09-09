import { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import WelcomeScreen from './pages/welcome';
import Survey from './pages/survey';
import Header from './components/header';
import Thankyou from './pages/thankyou';


function App() {
  const navigate = useNavigate();
  const [isSurveyStarted, setIsSurveyStarted] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const startSurvey = () => {
    const newSessionid = uuidV4();
    setSessionId(newSessionid)
    setIsSurveyStarted(true)
    navigate('/survey')
  }
  return (
    <>
      <Header />
      <div className='bg-gradient-to-b from-light-blue to-white'>
        <Routes>
          <Route path='/' element={<WelcomeScreen startSurvey={startSurvey} />} />
          {!isSurveyStarted ? (
            <>
              <Route path='/*' element={<Navigate to={'/'} />} />
            </>
          ) : (
            <>
              <Route path='/survey' element={<Survey sessionId={sessionId} />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
